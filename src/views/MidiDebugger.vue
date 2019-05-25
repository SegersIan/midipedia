<template>
    <div class="home">
        <h2>Message Debugger</h2>
        <p>
            Learn, understand and debug your MIDI messages with this interactive tool. You can manually type a
            MIDI message as one long binary number, a list of decimals (each item denoting a single byte) or just
            a single byte.
        </p>

        <p>
            A MIDI message is 1 to 3 bytes long. The first byte (the status byte) determines how many data
            bytes (all bytes following a status byte) should follow. If you specified more data bytes
            than the MIDI spec states for given status byte, those data byte(s) will be greyed out in the debugger. For more details
            read the FAQ.
        </p>

        <p>
            <span style="text-decoration: underline">Examples:</span> <br> <br>
            192 <br>
            192, 100 <br>
            192, 100, 100 <br>
            10000000 <br>
            10000000 01111111 (spaces not mandatory)<br>
            10000000 01111111 01111111 (spaces not mandatory)<br>
        </p>

        <div class="debugger" :class="{ 'debugger-invalid' : showErrorBox, 'debugger-valid' : showExplanationBox}">

            <h3 class="text-center">Debug your MIDI Message</h3>
            <input type="text" v-model="midiMessage" @input="validateMessage" placeholder="Type a MIDI message...">
            <div class="box box-error" style="text-align: left" v-if="showErrorBox">
                <strong>Invalid MIDI Message</strong>
                <ul>
                    <li v-for="error of validation.errors">{{error}}</li>
                </ul>
            </div>
            <div class="box box-explanation" v-else-if="showExplanationBox">

                <div class="text-center">Your MIDI message is {{midiDescription.byteDescriptions.length}} Byte(s) long, expected is {{midiDescription.expectedBytes}} Byte(s) with given Status byte.
                </div>
                <div class="border-midi-messages"></div>

                <h3 class="text-center"> {{midiDescription.description}} </h3>

                <div class="bytes">
                    <div class="byte" :class="{'byte-invalid':!byte.isExpected}" v-for="byte of midiDescription.byteDescriptions">
                        <div class="text-center" style="margin-top: 20px">{{byte.type}} Byte</div>
                        <div class="border-bytes"></div>
                        <midi-byte :byte="byte.valueAsBin"></midi-byte>
                        <h4 class="text-center">{{byte.description}}</h4>
                    </div>
                </div>

            </div>

        </div>

        <div>
            <midi-inputs></midi-inputs>
        </div>
    </div>
</template>

<script>
    import MidiInputs from "../components/MidiInputs";
    import Validator from "../lib/MidiMessageValidator";
    import MidiByte from "../components/MidiByte";

    export default {
        name: 'debugger',
        components: {
            MidiByte,
            MidiInputs
        },
        created() {
            this.midiMessage = '192, 100, 100';
            this.validateMessage({ target: { value: '192, 100, 100' } });
        },
        data() {
            return {
                midiMessage: null,
                midiDescription: null,
                validation: {
                    isValid: false,
                    errors: [],
                }
            }
        },
        computed: {
            showErrorBox() {
                return !!this.midiMessage && !this.validation.isValid
            },
            showExplanationBox() {
                return !!this.midiMessage && this.validation.isValid && !!this.midiDescription
            }
        },
        methods: {
            validateMessage(e) {
                const value = e.target.value;
                const { isValid, errors, description } = Validator.validateMessage(value);
                this.validation.isValid = isValid;
                this.validation.errors = errors;
                this.midiDescription = description;
            }
        }
    }
</script>

<style>

    .home {
        max-width: 800px;

    }

    .debugger {
        margin-top: 30px;
        border-width: 10px;
        border-style: solid;
        border-color: lightblue;
        text-align: center;
    }

    .debugger-invalid {
        border-color: salmon;
    }

    .debugger-valid {
        border-color: lightgreen;
    }

    input[type='text'] {
        height: 2rem;
        padding: 5px;
        width: 90%;
        font-size: 1.8rem;
        text-align: center;
        margin: 10px auto 20px auto;
    }

    .box {
        padding: 10px;
        margin: 10px auto 20px auto;
        width: 100%;
        border-radius: 5px;
    }

    .bytes {
        display: flex;
        justify-content: space-between;
    }

    .byte {
        flex: 1;
        padding: 0px 5px 0 5px;
    }

    .byte + .byte {
        margin-left: 20px;
    }


    .byte-invalid{
        background-color: lightgray;
    }


</style>
