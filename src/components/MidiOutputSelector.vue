<template>
    <div>
        <template v-if="foundOutputs">
            <div>
                <strong>Outputs:</strong>
                <ul>
                    <li v-for="output of outputs">
                        <input type="radio" name="midiOutput" @click="selectMidiOutput(output.id)" v-bind:value="value">

                        <template v-if="highlight">
                            <template v-if="output.name.toLowerCase().includes(highlight.toLowerCase())">
                                <label> {{output.name}} (vendor : {{output.manufacturer || 'N/A'}})</label>
                            </template>
                            <template v-else>
                                <label class="gray"> {{output.name}} (vendor : {{output.manufacturer || 'N/A'}})</label>
                            </template>
                        </template>

                        <template v-else>
                            <label> {{output.name}} (vendor : {{output.manufacturer || 'N/A'}})</label>
                        </template>

                    </li>
                </ul>
            </div>
        </template>
        <template v-else>
            <div class="pane__error">
                No MIDI outputs found. Make sure you have allowed the browser access to MIDI for this site.
            </div>
        </template>
    </div>
</template>

<script>

    import * as MidiApi from '../lib/MidiApi';

    export default {

        name: "MidiOutputSelector",

        props: {
            value: {
                type: String
            },
            highlight: {
                type: String,
                default: null
            }
        },

        data() {
            return {
                outputs: [],
                selectedMidiOutput: null
            }
        },

        computed: {
            foundOutputs() {
                return this.outputs.length > 0;
            }
        },

        created() {
            this.refreshMidiOutputs();
        },

        methods: {
            selectMidiOutput(id) {
                this.$emit('input', id)
            },

            async refreshMidiOutputs() {
                this.outputs = [];

                const outputs = await MidiApi.getOutputs();
                for (const [id, output] of outputs) {
                    this.outputs.push({
                        id: id,
                        name: output.name,
                        manufacturer: output.manufacturer,
                        state: output.state
                    });
                }
            }
        },

    }
</script>

<style scoped>

    ul {
        list-style: none;
        padding: 0 0 0 5px;
    }

    li {
        margin: 0;
    }

    label.gray{
        color: gray;
    }

</style>