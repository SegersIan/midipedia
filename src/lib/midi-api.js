export default {
    getInputs
}

async function getInputs() {
    const access = await navigator.requestMIDIAccess();
    return access.inputs;
}
