<template>
    <div>
        <button @click="init">CONNECT</button>
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

            <tr v-for="obj of inputs">
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

    import {mapState} from 'vuex';

    export default {
        name: "MidiInputs",
        async created() {
            this.init();
        },
        methods: {
            async init() {
                this.$store.dispatch('loadMidiDevices');
            }
        },
        computed: {
            ...mapState({
                inputs: state => state.midi.inputs
            })
        }
    }
</script>

<style scoped>

    .midi {
        height: 2rem;
        padding: 5px;
        width: 500px;
    }

</style>
