<template>
    <div>
        <p>
            For now I only support the PS4 gamepad. More might be added at a later stage.
        </p>

        <h2>Mapping</h2>

        <p>
            The PS4 DualShock controls are mapped as shown below.
            The DualShock is identified as 0x05c4 for the product Id and 0x054c as for
            the vendor Id.
        </p>

        <section style="display: flex; justify-content: space-between">

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Button</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(button, id) of mapping.buttons">
                        <td>{{id}}</td>
                        <td>{{button}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Axe</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(axe, id) of mapping.axes">
                        <td>{{id}}</td>
                        <td>{{axe}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div style="text-align: center; margin-right: 50px">
                <img src="../assets/ps4_controller.png" alt="PS4 Controller" style="height: 250px">
            </div>

        </section>

        <section>
            <h2>Sandbox</h2>

            <p>
                The gamepad api works with a polling mechanism. You have to check manually at an interval
                what the current state is of your gamepad. Every time reading through all buttons and axes to
                register their state. Being the position of a joystick on an axe or a button that's being pressed.
            </p>

            <p>
                The challenge with the Gamepad API is, as we are polling, we can not listen to the change of a
                particular
                button (e.g. just a single press). As when you press the button longer than double of the polling
                interval,
                we will register twice that the button is being "pressed". So depending your use case you only want to
                listen to a single "press" of a button, while on another use case, you want to keep knowing if a button
                remains to be pressed.
            </p>

            <p>
                One solution to this problem is to use poll on a small interval and create "events". Thereafter you
                can use these events as the source of an RxJs observable. With the RxJs library you will be able
                to filter out simple flows so that you only listen to once button was "pressed" and only trigger again
                on the event after the button was released first.
            </p>

            <h3>Configuration</h3>

            <p>As we have to "poll" the state of the gamepad at a certain interval, you can play around with the
                polling interval to see how the responsiveness is affected. Having a huge interval creates the
                risk
                that you might miss out on a button that was pressed, but having a very low interval might cause
                congestion on the Javascript event loop.</p>

            <div style="display: flex">

                <div style="flex: 1">
                    <h4>Polling</h4>
                    <label for="pollingInterval">Poll every </label>
                    <input type="number" v-model="pollingInterval" id="pollingInterval"> ms
                </div>

                <div style="flex: 3">
                    <h4>Connected Gamepads</h4>
                    <ul style="margin: 0 0 0 0">
                        <template v-if="gamepads.length">
                            <li v-for="gamepad of gamepads"><strong>{{gamepad.name}}</strong> with id
                                <strong>{{gamepad.id}}</strong></li>
                        </template>
                        <template v-else>
                            <li>
                                <strong>There are no gamepads connected. If connected, try to click a button which might
                                    trigger the discover your gamepad.</strong>
                            </li>
                        </template>
                    </ul>
                </div>

            </div>

            <h3>Gamepad Events</h3>

            <div style="display: flex">

                <div style="flex: 1">


                    <table>
                        <thead>
                        <tr>
                            <th>Gamepad</th>
                            <th>Button</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="actions.length">
                            <tr v-for="action of actions">
                                <td>{{action.gamepadId}}</td>
                                <td>{{action.text}}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="2">No events, press a button.</td>
                            </tr>
                        </template>
                        </tbody>
                    </table>

                </div>

                <div style="flex: 3">

                    <table>
                        <thead>
                        <tr>
                            <th>Axe</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="axes.length">
                            <tr v-for="axe in axes">
                                <td>{{axe.label}}</td>
                                <td>{{axe.value}}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="2">No gamepad or axes found.</td>
                            </tr>
                        </template>

                        </tbody>
                    </table>

                </div>

                <div style="margin-bottom: 50px"></div>

            </div>
        </section>


    </div>
</template>

<script>

    import * as GamepadApi from '../lib/GamepadApi';
    import Ps4GamepadMap from '../lib/Ps4GamepadMap';

    export default {
        name: "GamepadDebugger",
        data() {
            return {
                mapping: {
                    buttons: {},
                    axes: {}
                },
                gamepads: [],
                actions: [],
                axes: [],
                actionsLimit: 10,
                pollingInterval: 100,
                pollingIntervalId: null
            }
        },
        created() {
            this.initializeMapping();
            this.initializeListeners();
            this.startControlsPolling();
        },
        methods: {

            initializeMapping() {
                this.mapping.buttons = Ps4GamepadMap.buttons;
                this.mapping.axes = Ps4GamepadMap.axes;
            },

            initializeListeners() {
                GamepadApi.addEventListeners({
                    onConnected: () => this.syncConnectedGamepads(),
                    onDisconnected: () => this.syncConnectedGamepads(),
                });
            },

            syncConnectedGamepads() {
                const gamepads = GamepadApi.getGamepads();
                this.gamepads = Object.entries(gamepads)
                    .reduce((acc, [id, gamepad]) => {
                        if (gamepad) {
                            acc.push({id: id, name: gamepad.id});
                        }
                        return acc;
                    }, [])
            },

            async startControlsPolling() {
                if (this.pollingIntervalId) {
                    clearInterval(this.pollingIntervalId);
                }
                this.pollingIntervalId = setInterval(() => {
                    const gamepads = GamepadApi.getGamepads();

                    for (const [gamepadId, gamepad] of Object.entries(gamepads)) {
                        if (!gamepad) {
                            continue;
                        }
                        const newButtonActions = gamepad
                            .buttons
                            .reduce((acc, button, index) => {
                                if (button.pressed) {
                                    acc.push({
                                        gamepadId: gamepadId,
                                        buttonId: index,
                                        type: 'button',
                                        text: Ps4GamepadMap.buttons[index],
                                        action: 'press'
                                    });
                                    return acc;
                                }
                                return acc;
                            }, []);

                        this.actions.splice(0, 0, ...newButtonActions);

                        if (this.actions.length > this.actionsLimit) {
                            this.actions.splice(this.actionsLimit)
                        }

                        this.axes = gamepad
                            .axes
                            .map((axe, index) => {
                                return {
                                    label: this.mapping.axes[index],
                                    value: axe
                                }
                            });
                    }

                }, parseInt(this.pollingInterval));
            },

        },

        watch: {
            pollingInterval() {
                this.startControlsPolling();
            }
        }
    }
</script>

<style scoped>

    section + section {
        margin-top: 30px;
    }

</style>