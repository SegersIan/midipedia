<template>
    <div>
        <h2>Gamepad Debugger</h2>
        <p>For now I only support the PS4 gamepad. More might be added at a later stage.</p>

        <h3>Mapping</h3>

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


        <div style="text-align: center">
            <img src="../assets/ps4_controller.png" alt="PS4 Controller" style="height: 350px">
        </div>
    </div>
</template>

<script>
    import Ps4GamepadMap from '../lib/Ps4GamepadMap';

    export default {
        name: "GamepadDebugger",
        data() {
            return {
                mapping: {
                    buttons: {}
                }
            }
        },
        created() {
            this.initializeMapping();
        },
        methods: {
            initializeMapping() {
                this.mapping.buttons = Ps4GamepadMap.buttons;
            }
        }
    }
</script>

<style scoped>

</style>