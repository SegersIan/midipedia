<template>
    <div>
        <div>
            <input class="midi" id="midiMessage" type="text" v-model="midiMessageExplained">
        </div>

        <div>
            <MidiMessage :value="midiMessage"></MidiMessage>
        </div>

        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>State</th>
                <th>Connection</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="([, obj]) of inputs">
                <td>{{obj.id}}</td>
                <td>{{obj.type}}</td>
                <td>{{obj.name}}</td>
                <td>{{obj.state}}</td>
                <td>{{obj.connection}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import MidiMessage from "./MidiMessage";

    export default {
        name: "MidiInputs",
        components: { MidiMessage },
        data() {
            return {
                inputs: [],
                midiMessage: [177, 24, 127],
            }
        },
        created() {

        },
        methods: {

        },
        computed: {
            midiMessageExplained() {
                if(!this.midiMessage){
                    return 'No recent MIDI Message Received'
                }
                return this.midiMessage;
            }
        }
    }
</script>

<style scoped>

    .midi{
        height: 2rem;
        padding: 5px;
        width: 500px;
    }

</style>
