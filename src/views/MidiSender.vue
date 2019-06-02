<template>
    <div>
        <h2>MIDI Sender</h2>

        Here we have an interface where we can send custom MIDI messages to any connected MIDI output.

        <h3>1. Select MIDI Output</h3>

        <p>Select the MIDI output where you want to send your MIDI message to.</p>

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

        <h3>2. Specify a MIDI message</h3>

        <div>
            <label>MIDI Message:</label> <input type="text" v-model="midiMessage">
        </div>

        <h3>3. Send the MIDI message</h3>

        <button @click="sendMidiMessage">Send</button>

        <h3>Log</h3>

        <span v-for="line of log">{{line}}<br></span>


    </div>
</template>

<script>

    import * as MidiApi from '../lib/MidiApi';

    export default {
        name: "MidiSender",

        data() {
            return {
                midiOutputs: [],
                selectedMidiOutput: null,
                midiMessage: null,
                log: []
            }
        },

        created() {
            this.refreshMidiOutputs();
        },

        methods: {
            selectMidiOutput(id) {
                this.selectedMidiOutput = id;
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

            async sendMidiMessage() {
                const midiAccess = await MidiApi.requestMidiAccess();
                const midiOutput = midiAccess.outputs.get(this.selectedMidiOutput);
                const bytes = [177, 6, 0];
                await midiOutput.send(bytes);
                const timeStamp = (new Date()).toISOString();

                this.log.splice(0, 0, `${timeStamp}: Sent ${JSON.stringify(bytes)} to ${midiOutput.name}`);

                if (this.log.length > 10) {
                    this.log.splice(10);
                }
            }
        }

    }
</script>

<style scoped>

</style>