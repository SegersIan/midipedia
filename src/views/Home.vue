<template>
    <div class="home center text-center">
        <h1>MIDIpedia</h1>
        <p>
            Learn, understand and debug your MIDI messages with this interactive tool. You can manually type a
            MIDI message as one long binary number, a list of decimals (each item denoting a single byte) or just
            a single byte.
        </p>

        <div class="debugger" :class="{ 'debugger-invalid' : showErrorBox, 'debugger-valid' : showExplanationBox}">

            <h3 class="text-center">Debug your MIDI Message</h3>
            <input type="text" v-model="midiMessage" @input="validateMessage" placeholder="Type a MIDI message...">
            <div class="box box-error" style="color: black; text-align: left" v-if="showErrorBox">
                <strong>Invalid MIDI Message</strong>
                <ul>
                    <li v-for="error of validation.errors">{{error}}</li>
                </ul>
            </div>
            <div class="box box-explanation" v-else-if="showExplanationBox">

                <div class="text-center">Your MIDI Message is {{midiDescription.byteDescriptions.length}} Byte(s) long.
                </div>
                <div class="border-midi-messages"></div>

                <h3 class="text-center"> {{midiDescription.description}} </h3>

                <div class="bytes">
                    <div class="byte " v-for="byte of midiDescription.byteDescriptions">
                        <div class="text-center" style="margin-top: 20px">{{byte.type}} Byte</div>
                        <div class="border-bytes"></div>
                        <midi-byte :byte="byte.valueAsBin"></midi-byte>
                        <h4 class="text-center">{{byte.description}}</h4>
                    </div>
                </div>

            </div>

        </div>

        <div class="faq">
            <h2 style="cursor:pointer;text-decoration: underline"><span @click="showFaq = !showFaq">FAQ</span></h2>
            <template v-if="showFaq">
                <h3>What is MIDI?</h3>
                <p>
                    MIDI stands for <span class="bold">M</span>usic <span class="bold">I</span>nstrument
                    <span class="bold">D</span>igital <span class="bold">I</span>nterface. This interface is used to
                    communicate
                    between music instruments, <a href="https://en.wikipedia.org/wiki/MIDI" target="_blank">check the
                    Wiki.</a>
                </p>
                <p>
                    The MIDI protocol communicates by sending "messages" to all connected devices. These messages
                    describe
                    instructions that other devices can decide to consume or ignore.
                </p>

                <h3>How are MIDI messages constructed?</h3>
                <p>Such a "message" exists out of 1, 2 or 3 bytes. The first byte is known as a "status" byte, the
                    subsequent
                    bytes are known as "data" bytes. A "message" has always a status byte, but optionally has data bytes
                    depending
                    the MIDI specification.
                </p>

                <p>
                    A status byte it's MSB is always "1" <br>
                    A data byte it's MSB is always "0"
                </p>

                <h3>What is a MSB?</h3>
                <p>Most Significant Bit, this is the first (most left) bit of a binary number or byte.
                    <br> (e.g. The MSB of the binary number "<span class="bold">1</span>000" is "<span
                            class="bold">1</span>")
                </p>

                <h3>What is a LSB?</h3>
                <p>Least Significant Bit, this is the last (most right) bit of a binary number or byte.
                    <br> (e.g. The LSB of the binary number "100<span class="bold">0</span>" is "<span
                            class="bold">0</span>")
                </p>

                <h3>Where can I find more on the specification?</h3>
                <p><a href="https://www.midi.org" target="_blank">www.midi.org</a></p>
            </template>
        </div>
    </div>
</template>

<script>
    import MidiInputs from "../components/MidiInputs";
    import Validator from "../lib/MidiMessageValidator";
    import MidiByte from "../components/MidiByte";

    export default {
        name: 'home',
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
                showFaq: false,
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
        margin-bottom: 20px;
    }

    .box {
        padding: 10px;
        margin: 10px auto 20px auto;
        width: 90%;
        border-radius: 5px;
    }

    .box-error {
        color: #ffffff;
    }

    .box-explanation {
        color: #000000;
    }

    .bytes {
        display: flex;
        justify-content: space-between;
    }

    .byte {
        flex: 1;
    }

    .byte + .byte {
        margin-left: 20px;
    }

    .bold {
        font-weight: bold;
    }

    .faq {
        margin-top: 30px;
        color: #777777;
    }


</style>
