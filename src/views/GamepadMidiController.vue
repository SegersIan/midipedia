<template>
    <div>
        <h2>Gamepad + Midi Project</h2>
        <p>
            The idea of this project is to turn a gamepad (e.g. PS4 DualShock) into a MIDI controller.
        </p>

        <h3>How it works</h3>
        <p>
            We connect to our PS4 DualShock via the Gamepad API and map certain MIDI messages
            to each button. Each time a button is pressed on the gamepad, we send the mapped
            MIDI message to selected MIDI output. This way you can control any music instrument
            or music software that uses MIDI with your gamepad.
        </p>

        <p>
            <em>You should be able to do this with any gamepad, I went for the PS4 DualShock
                as that's what I have available at hand.</em>
        </p>

        <h3>1. PS4 DualShock to MIDI message</h3>

        <p>
            I have configured the following mapping between the PS4 DualShock
            gamepad with given MIDI messages. I've added also the description of what the
            midi message suppose to mean/do.
        </p>

        <table>
            <thead>
            <tr>
                <th>Button</th>
                <th>Midi Bytes</th>
                <th>Midi Bytes Description</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item of gamepadToMidiMap">
                <td>{{item.button}}</td>
                <td>{{item.message}}</td>
                <td>{{item.description}}</td>
            </tr>
            </tbody>
        </table>

        <h3>2. Connect your input</h3>

        <p>Make sure you have successfully connected your PS4 Dualshock which
            we will use as our input mechanism.</p>

        <h4>Available gamepad(s)</h4>

        <button @click="refreshGamepads">Refresh</button>

        <template v-if="gamepads.length">
            <ul style="list-style: none">
                <li v-for="gamepad of gamepads">
                    <input type="radio" name="gamepadSource" @click="selectGamepad(gamepad.id)">
                    <label>{{gamepad.name}}</label>
                </li>
            </ul>
        </template>
        <template v-else>
            <p class="error">No gamepad(s) found.</p>
        </template>

        <h3>3. Choose your output</h3>

        <p>
            Now that we have and PS4 Dualshock as an input and a mapping for our PS4 DualShock buttons to specific
            MIDI messages, we can select a MIDI output that we want to sent our MIDI messages to.
            We want to send our MIDI messages to an instrument or music/dj software that listens
            to MIDI.
            If you don't have a MIDI device that can receive MIDI messages, you can use
            <a href="https://www.snoize.com/MIDIMonitor/" target="_blank">MIDI Monitor for Mac</a> (or similar software)
            to verify you are receiving messages.
            Make sure that your MIDI monitoring software is acting as a destination for MIDI.
        </p>

        <div style="text-align: center">
            <img src="../assets/midi_monitor_setting.png" alt="MIDI monitor Screenshot" style="height: 200px">
        </div>

        <h4>Available MIDI output(s)</h4>

        <button @click="refreshMidiOutputs">Refresh</button>

        <template v-if="midiOutputs.length">
            <ul style="list-style: none">
                <li v-for="midiOutput of midiOutputs">
                    <input type="radio" name="midiOutput" @click="selectMidiOutput(midiOutput.id)">
                    <label>
                        {{midiOutput.name}} from {{midiOutput.manufacturer}} - {{midiOutput.state}}
                    </label>
                </li>
            </ul>
        </template>
        <template v-else>
            <p class="error">No MIDI output(s) found.</p>
        </template>

        <h3>4. Let's play</h3>

        <p>
            Everything is setup and configured. You should now be able to control your MIDI connected
            device (an instrument or software that supports MIDI like Traktor).
            For my example I used Traktor dj software to test this feature.
        </p>

        <template v-if="selectedGamepad === null && selectedMidiOutput === null">
            <p class="error">You have not selected a gamepad, nor a MIDI output yet.</p>
        </template>
        <template v-if="selectedGamepad !== null && selectedMidiOutput !== null">
            <p class="ok">
                You are now sending from gamepad {{selectedGamepad}} to MIDI output {{selectedMidiOutput}}.
            </p>
        </template>
        <template v-else-if="selectedGamepad !== null">
            <p class="error">You have selected a gamepad, but not a MIDI output yet.</p>
        </template>
        <template v-else-if="selectedMidiOutput !== null">
            <p class="error">You have selected a MIDI output, but not a Gamepad yet.</p>
        </template>

        <h4>Sent Log</h4>
        <template v-if="sentLog.length">
            <pre><template v-for="item of sentLog">{{item}} <br></template></pre>
        </template>
        <template v-else>
            <pre>Nothing sent.</pre>
        </template>

    </div>
</template>

<script>

    import Ps4GamepadMap from '../lib/Ps4GamepadMap';
    import Ps4MidiMap from '../lib/Ps4MidiMap';
    import MidiMessage from '../lib/MidiMessage';
    import describeMidiMessage from '../lib/MidiMessageDescriber';
    import * as GamepadApi from '../lib/GamepadApi';
    import * as MidiApi from '../lib/MidiApi';

    export default {
        name: "GamepadMidiController",
        data() {
            return {
                gamepadToMidiMap: [],
                gamepads: [],
                selectedGamepad: null,
                gamepadPollInterval: 300,
                gamepadPollIntervalId: null,
                midiOutputs: [],
                selectedMidiOutput: null,
                sentLog: []
            }
        },
        created() {
            this.initializeMapping();
            this.refreshGamepads();
            this.refreshMidiOutputs();
        },
        beforeDestroy() {
            if (this.gamepadPollIntervalId) {
                clearInterval(this.gamepadPollIntervalId);
            }
        },
        methods: {
            initializeMapping() {
                const buttonMap = Ps4GamepadMap.buttons;
                const midiMap = Ps4MidiMap.buttons;

                for (const [buttonId, label] of Object.entries(buttonMap)) {
                    const midiMessage = midiMap[buttonId];
                    const midiDescription = describeMidiMessage(new MidiMessage(midiMessage));
                    this.gamepadToMidiMap.push({
                        button: label,
                        message: midiMessage,
                        description: midiDescription.description
                    })
                }
            },

            refreshGamepads() {
                this.gamepads = [];
                this.selectedGamepad = null;

                const gamepads = GamepadApi.getGamepads();
                for (const [id, gamepad] of Object.entries(gamepads)) {
                    if (gamepad) {
                        this.gamepads.push({id, name: gamepad.id})
                    }
                }
            },

            selectGamepad(id) {
                this.selectedGamepad = id;
                this.pollGamepad();
            },

            async refreshMidiOutputs() {
                this.midiOutputs = [];
                this.selectedMidiOutput = null;

                const midiAccess = await MidiApi.requestMidiAccess();

                for (const [id, output] of midiAccess.outputs) {
                    this.midiOutputs.push({
                        id: id,
                        name: output.name,
                        manufacturer: output.manufacturer,
                        state: output.state
                    });
                }
            },

            selectMidiOutput(id) {
                this.selectedMidiOutput = id;
                this.pollGamepad();
            },

            pollGamepad() {
                if (this.selectedMidiOutput === null || this.selectedGamepad === null) {
                    console.log('Cant poll gamepad yet.');
                    return;
                }
                if (this.gamepadPollIntervalId) {
                    clearInterval(this.gamepadPollIntervalId);
                }

                this.gamepadPollIntervalId = setInterval(() => {
                    const gamepads = GamepadApi.getGamepads();
                    const gamepad = gamepads[this.selectedGamepad];
                    if (gamepad) {
                        Object.entries(gamepad.buttons)
                            .filter(([, {pressed}]) => !!pressed)
                            .forEach(([buttonId]) => this.sendToOutput(buttonId));
                    } else {
                        console.error(`No gamed found for ${this.selectedGamepad}`);
                    }
                }, this.gamepadPollInterval)

            },

            async sendToOutput(buttonId) {
                const bytes = Ps4MidiMap.buttons[buttonId];
                const buttonLabel = Ps4GamepadMap.buttons[buttonId];
                const midiAccess = await MidiApi.requestMidiAccess();
                const midiOutput = midiAccess.outputs.get(this.selectedMidiOutput);
                await midiOutput.send(bytes);
                const timeStamp = (new Date()).toISOString();

                this.sentLog.splice(0, 0, `${timeStamp}: Pressed ${buttonLabel}, Sent ${JSON.stringify(bytes)} to ${midiOutput.name}`);

                if (this.sentLog.length > 10) {
                    this.sentLog.splice(10);
                }
            }
        }
    }

</script>

<style scoped>

    p.error {
        background-color: salmon;
        padding: 10px;
    }

    p.ok {
        background-color: lightgreen;
        padding: 10px;
    }

</style>