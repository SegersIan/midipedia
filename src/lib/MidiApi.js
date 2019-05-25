export async function requestMidiAccess({sysex = false} = {}) {
    return navigator.requestMIDIAccess({sysex});
}