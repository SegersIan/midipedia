<template>
    <div>
        <h2>Traktor Studio</h2>

        <p>
            This is a small proof of concept on how we can control Traktor Studio from the web browser using the
            MIDI Web API. A few steps are required to make this work. This proof of concept was developed using
            the latest Chrome (v74+) on macOS (10.14.5) and Traktor Pro 3.
            If the following does not work on your machine, feel free to contact me.
        </p>

        <iframe width="560" height="315" src="https://www.youtube.com/embed/3F2ZgUCCzew" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>


        <h3>1. Start Traktor application</h3>

        <p>
            We want to control Traktor via the browser, but obviously we need to have the application running first.
            For convenience, disconnect any other MIDI controllers. This is a proof of concept, so it's not
            so fool-proof.
        </p>

        <h3>2. Configure Traktor</h3>

        <p>TODO, need to have first full working example for browser and PS4.</p>

        <h3>3. Select the MIDI output</h3>

        <p>
            When starting Traktor, often many MIDI outputs are loaded (and persisted for a while) related to
            MIDI devices from Native Instruments. We're looking for the <strong>Traktor Virtual Input</strong> for our
            MIDI output. This is not a typo, for some reason, our target <strong>MIDI output</strong> has the word
            <strong>input</strong>
            in the name of the output.
        </p>

        <MidiOutputSelector v-model="selectedOutput" highlight="Traktor Virtual Input"></MidiOutputSelector>

        <div v-if="!selectedOutput" class="pane__error">
            No MIDI output selected.
        </div>

        <h3>4. Choose A Controller</h3>

        <p>
            I have provided two methods to control Traktor. You can use the browser mini mixer, or else
            hook up a PS4 DualShock controller.
        </p>

        <div class="input__selector">
            <div class="input__option" :class="{'input__option__selected' : inputType === 'web'}"
                 @click="inputType = 'web'">Web Mixer
            </div>
            <div class="input__option" :class="{'input__option__selected' : inputType === 'ps4'}"
                 @click="inputType = 'ps4'">PS4 DualShock
            </div>
        </div>

        <template v-if="!!inputType">

            <h3>5. Play Around</h3>

            <p>
                <em>Notes:</em> We do have to preload our decks A and B with tracks for this proof of concept.
                This is, after all a just a proof of a concept.
            </p>

            <template v-if="inputType === 'web'">

                <p>
                    Play around, notice that if you would adjust the the volume or speed in Traktor, the controls here
                    in
                    the
                    web application will adjust accordingly. Except at the initial page load, I did not found a way to
                    "query"
                    the current state of any controls at the page load. Once you start changing the speed and volume (in
                    Traktor
                    or here), all
                    related controls will sync up.
                </p>

                <div class="mixer">
                    <div class="deck">
                        <div class="deck__name">Deck A</div>

                        <div class="deck__faders">
                            <div class="deck__fader">
                                <div class="deck__volume">
                                    <input type="range" min="0" max="127" step="0" @input="setVolume($event, 176)"
                                           v-model="decks.a.volume">
                                </div>
                                <div style="text-align: center">Volume</div>
                            </div>
                            <div class="deck__fader">
                                <div class="deck__volume">
                                    <input type="range" min="0" max="127" step="0" @input="setSpeed($event, 176)"
                                           v-model="decks.a.speed">
                                </div>
                                <div style="text-align: center">Speed</div>
                            </div>
                        </div>

                        <div class="deck__controls">
                            <button @click="togglePlay($event, 176)">PLAY/PAUSE</button>
                        </div>
                    </div>

                    <div class="deck">
                        <div class="deck__name">Deck B</div>

                        <div class="deck__faders">
                            <div class="deck__fader">
                                <div class="deck__volume">
                                    <input type="range" min="0" max="127" step="0" @input="setVolume($event, 177)"
                                           v-model="decks.b.volume">
                                </div>
                                <div style="text-align: center">Volume</div>
                            </div>
                            <div class="deck__fader">
                                <div class="deck__volume">
                                    <input type="range" min="0" max="127" step="0" @input="setSpeed($event, 177)"
                                           v-model="decks.b.speed">
                                </div>
                                <div style="text-align: center">Speed</div>
                            </div>
                        </div>

                        <div class="deck__controls">
                            <button @click="togglePlay($event, 177)">PLAY/PAUSE</button>
                        </div>
                    </div>
                </div>

            </template>

            <template v-else-if="inputType === 'ps4'">
                <div>
                    // TODO
                </div>
            </template>


        </template>

    </div>
</template>

<script>

    import MidiOutputSelector from "../components/MidiOutputSelector";
    import * as MidiApi from '../lib/MidiApi';

    export default {
        name: "TraktorStudio",
        data() {
            return {
                inputType: null,
                selectedOutput: null,
                decks: {
                    a: {
                        volume: 0,
                        speed: 63
                    },
                    b: {
                        volume: 0,
                        speed: 63
                    }
                }
            }
        },
        created() {
            this.onInit();
        },
        components: {
            MidiOutputSelector
        },
        methods: {

            async onInit() {
                const midiAccess = await MidiApi.requestMidiAccess();

                let targetInputId = null;

                for (const [id, output] of midiAccess.inputs) {
                    if (output.name === 'Traktor Virtual Output') {
                        targetInputId = id;
                    }
                }

                const midiInput = midiAccess.inputs.get(targetInputId);

                midiInput.onmidimessage = (e) => {
                    if (e.data[0] === 176 && e.data[1] === 9) {
                        if (e.data[2] !== this.volume) {
                            this.decks.a.volume = e.data[2];
                        }
                    }

                    if (e.data[0] === 176 && e.data[1] === 10) {
                        if (e.data[2] !== this.volume) {
                            this.decks.a.speed = e.data[2];
                        }
                    }

                    if (e.data[0] === 177 && e.data[1] === 9) {
                        if (e.data[2] !== this.volume) {
                            this.decks.b.volume = e.data[2];
                        }
                    }

                    if (e.data[0] === 177 && e.data[1] === 10) {
                        if (e.data[2] !== this.volume) {
                            this.decks.b.speed = e.data[2];
                        }
                    }
                };

            },

            async sendToOutput(bytes) {
                if (!this.selectedOutput) {
                    return;
                }
                const midiAccess = await MidiApi.requestMidiAccess();
                const midiOutput = midiAccess.outputs.get(this.selectedOutput);
                if (!midiOutput) {
                    return;
                }
                await midiOutput.send(bytes);
                console.log(`Sent ${bytes}`);
            },
            async setVolume(e, status) {
                const payload = [status, 6, Number(e.target.value)];
                await this.sendToOutput(payload);
            },
            async setSpeed(e, status) {
                const payload = [status, 7, Number(e.target.value)];
                await this.sendToOutput(payload);
            },
            async togglePlay(e, status) {
                const payload = [status, 8, 0];
                await this.sendToOutput(payload);
            }
        }
    }
</script>

<style scoped>

    .input__selector {
        display: flex;
        justify-content: space-evenly;
        width: 400px;
    }

    .input__option {
        flex: 1;
        text-align: center;
        padding: 10px 0 10px 0;
        font-weight: bold;
        cursor: pointer;
        border: 1px solid #ffffff;
    }

    .input__option:hover {
        border: 1px dotted black;
    }

    .input__option__selected {
        background-color: beige;
    }

    .mixer {
        display: flex;
        justify-content: space-evenly;
        width: 800px;
    }

    .mixer button {
        border: 1px solid;
        padding: 5px 5px 5px 5px;
    }

    .mixer .deck {
        flex: 1 0 auto;
        border: 1px solid;
    }

    .mixer .deck__name {
        text-align: center;
        font-weight: bold;
        font-size: 24px;
    }

    .mixer .deck__volume {
        height: 100px;
        padding: 80px 0 0 0;
        text-align: center;
    }

    .mixer .deck__faders {
        display: flex;
        justify-content: space-evenly;
    }

    .mixer .deck__fader input[type="range"] {
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
    }

    .mixer .deck__controls {
        text-align: center;
        padding: 5px;
        margin-top: 5px;
    }

</style>