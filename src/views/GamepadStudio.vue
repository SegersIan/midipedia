<template>
    <div>
        <h2>Send MIDI Message to Traktor</h2>

        <div>
            <label for="midi">MIDI Message: </label> <input type="text" name="midi" id="midi">
        </div>

        <div>
            <button>SEND</button>
            <button @click="initMidi">INIT</button>
        </div>

        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Buttons</th>
                <th>Axes</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(gamepad, id) in gamepads">
                <template v-if="gamepad">
                    <td>{{gamepad.id}}</td>
                    <td>{{gamepad.buttons.length}}</td>
                    <td>{{gamepad.axes.length}}</td>
                </template>
            </tr>
            </tbody>
        </table>

        <div style="text-align: center">
            <img src="../assets/ps4_controller.png" alt="PS4 Controller" style="height: 350px">
        </div>

        <table>
            <thead>
            <tr>
                <th>Button</th>
                <th>MIDI Message</th>
            </tr>
            </thead>

        </table>

        <h3>Last events</h3>
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

    </div>
</template>

<script>

    import * as MidiApi from '../lib/MidiApi';
    import * as GamepadApi from '../lib/GamepadApi';
    import Ps4Map from '../lib/Ps4GamepadMap';

    export default {
        name: "GamepadStudio",

        data() {
            return {
                gamepads: {},
                actions: []
            }
        },

        created() {
            this.pageInit();
        },

        methods: {

            async pageInit() {
                GamepadApi.addEventListeners({
                    onConnected: () => this.gamepads = GamepadApi.getGamepads(),
                    onDisconnected: () => this.gamepads = GamepadApi.getGamepads(),
                });
                this.startControlsPolling();
            },

            async startControlsPolling() {
                setInterval(() => {
                    const gamepads = GamepadApi.getGamepads();

                    for (const [gamepadId, gamepad] of Object.entries(gamepads)) {
                        if (!gamepad) {
                            continue;
                        }
                        const events = gamepad
                            .buttons
                            .reduce((acc, button, index) => {
                                if (button.pressed) {
                                    acc.push({
                                        gamepadId: gamepadId,
                                        buttonId: index,
                                        type: 'button',
                                        text: Ps4Map.buttons[index],
                                        action: 'press'
                                    });
                                    return acc;
                                }
                                return acc;
                            }, []);
                        this.actions.push(...events);
                    }


                }, 500);
            },

            async initMidi() {
                const midiAccess = await MidiApi.requestMidiAccess({sysex: true});
                console.log(midiAccess);

                for (const output of midiAccess.outputs.values()) {
                    try {
                        output.send([0x90, 0x45, 0x7f]);
                    } catch (e) {
                        console.log(e)
                    }
                }

            }

        }
    }

</script>

<style scoped>

</style>