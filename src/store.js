import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        midi: {
            inputs: {},
            access: null,
            inputMessageBuffer: []
        }
    },
    mutations: {
        addMidiAccess(state, midiAccess) {
            if (state.midi.access) {
                return;
            }
            state.midi.access = midiAccess;
        },
        addMidiInput(state, midiInput) {
            if (midiInput.id in state.midi.inputs) {
                return;
            }
            state.midi.inputs = {
                [midiInput.id]: midiInput,
                ...state.midi.inputs
            }
        }
    },
    actions: {
        async loadMidiDevices({ commit, state }) {
            console.log('loadMidiDevices');
            const midiAccess = await navigator.requestMIDIAccess({ sysex: true });
            commit('addMidiAccess', midiAccess);


            midiAccess.onstatechange = (e) => {
                console.log('access.onstatechange');
                console.log(e);
                if (e.type === "statechange" && e.target.input) {
                    if (e.target.input.id in state.midi.inputs) {
                        return;
                    }
                    e.target.input.onmidimessage = ({ data }) => {
                        console.log(data);
                    };
                    console.log("updated");
                    commit('addMidiInput', e.target.input);
                } else if (e.type === "statechange" && e.target.inputs) {
                    e.target.inputs.forEach(input => {
                        if (input.id in state.midi.inputs) {
                            return;
                        }
                        input.onmidimessage = ({ data }) => {
                            console.log(data);
                        };
                        console.log("updated");
                        commit('addMidiInput', input);
                    })
                } else {
                    console.log(e);
                }
            };


            midiAccess.inputs.forEach(input => {
                if (input.id in state.midi.inputs) {
                    return;
                }

                input.onmidimessage = (e) => {
                    console.log(e);
                };
                input.onstatechange = (e) => {
                    if (e.port.id) {
                        commit('addMidiInput', e.port);
                        e.target.onmidimessage = (z) => {
                            console.log(z);
                        };
                        console.log(e);
                    }
                };
                console.log(input);
            });


        }
    }

})
