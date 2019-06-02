export async function requestMidiAccess({sysex = false} = {}) {
    return navigator.requestMIDIAccess({sysex});
}

export async function getOutputs(){
    const midiAccess = await navigator.requestMIDIAccess();
    return  midiAccess.outputs;
}