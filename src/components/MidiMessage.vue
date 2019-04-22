<template>
    <div>
        <h3>MIDI Message Structure</h3>
        <p>The MIDI message is {{value.length}} byte(s) long.</p>
        <div>
            <div class="bytes">
                <div v-for="byte of bytes" class="byte">
                    <div style="border-bottom: 1px solid">{{byte.getBinValue()}}</div>
                    <div> {{byte.getByteType()}}</div>
                </div>
            </div>
            <div>
                What it means :
            </div>
        </div>
    </div>
</template>

<script>
    import MidiByte from '../lib/MidiByte';

    export default {
        name: "MidiMessage",
        props: ['value'],
        methods: {
            isStatusByte(value) {
                return this.decToBin(value).startsWith('1');

            },
            isDataByte(value) {
                return this.decToBin(value).startsWith('0');
            },
            decToBin(value) {
                const decValue = parseInt(value, 10);
                return decValue.toString(2);
            }
        },
        computed: {
            bytes() {
                return this.value.map(x => new MidiByte(x));
            }
        },
        filters: {
            decToBin(value) {
                const decValue = parseInt(value, 10);
                return decValue.toString(2);
            },
            mapToByteType(value) {
                const decValue = parseInt(value, 10);
                const binValue = decValue.toString(2);
                if (binValue.startsWith('1')) {
                    return 'Status Message'
                }
                if (binValue.startsWith('0')) {
                    return 'Data Message'
                }
                return 'Unknown';
            }
        }
    }
</script>

<style scoped>

    .bytes {
        display: flex;
        border: 1px solid black;
        justify-content: space-around;
    }

    .byte {

    }

</style>
