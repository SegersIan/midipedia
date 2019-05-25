<template>
    <div>
        <h2>Gamepad Debugger</h2>
        <p>
            For now I only support the PS4 gamepad. More might be added at a later stage.
            The PS4 controller is identified with the Vendor Id 0x054c and as product Id 0x05c4.
        </p>

        <h3>Mapping</h3>

        <h4>Buttons</h4>

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

        <h4>Axes</h4>

        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(axe, id) of mapping.axes">
                <td>{{id}}</td>
                <td>{{axe}}</td>
            </tr>
            </tbody>
        </table>


        <h3>Connected Gamepads</h3>
        <p>By default you are able to connect up to 4 gamepads simultaneously.</p>
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="gamepad of gamepads">
                <td>{{gamepad.id}}</td>
                <td>{{gamepad.name}}</td>
            </tr>
            </tbody>
        </table>

        <h3>Last events</h3>

        <div>
            <label for="pollingInterval">Polling Interval</label>
            <input type="number" v-model="pollingInterval" id="pollingInterval">
        </div>

        <h4>Buttons</h4>

        <table>
            <thead>
            <tr>
                <th>GamepadId</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="action of actions">
                <td>{{action.gamepadId}}</td>
                <td>{{action.text}}</td>
            </tr>
            </tbody>
        </table>

        <h4>Axes</h4>

        <table>
            <thead>
                <tr>
                    <th>Axe</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="axe in axes">
                <td>{{axe.label}}</td>
                <td>{{axe.value}}</td>
            </tr>
            </tbody>
        </table>

        <div style="text-align: center">
            <img src="../assets/ps4_controller.png" alt="PS4 Controller" style="height: 350px">
        </div>
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

</style>