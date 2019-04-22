import MidiByte from './MidiByte';
import MidiMessage from './MidiMessage';
import describeMidiMessage from './MidiMessageDescriber';

export default {
    validateMessage
}

function validateMessage(value) {
    const result = createResult();
    const sanitizedValue = value.replace(/\s/g, '');
    if (typeof value === 'string') {
        const isValidBytes = /^([01]{8}){1,3}$/.test(sanitizedValue);
        if (isValidBytes) {
            const midiMessage = new MidiMessage(sanitizedValue);
            if (!midiMessage.hasStatusByte() || midiMessage.getStatusByte().startsWith('0')) {
                result.errors.push('First byte must be a "Status Byte", a "Status Byte" always start with "1" (MSB)');
            }
            if (midiMessage.hasDataByte1() && midiMessage.getDataByte1().startsWith('1')) {
                result.errors.push('Second byte must be a "Data Byte", a "Data Byte" always start with "0" (MSB)');
            }
            if (midiMessage.hasDataByte2() && midiMessage.getDataByte2().startsWith('1')) {
                result.errors.push('Third byte must be a "Data Byte", a "Data Byte" always start with "0" (MSB)');
            }
            if (result.errors.length === 0) {
                result.isValid = true;
                result.description = describeMidiMessage(midiMessage);
            }
            return result;
        }

        const bytes = sanitizedValue.split(',');
        const validBytes = bytes.every(byte => /^[0-9]{1,3}$/.test(byte));
        if (validBytes && bytes.length >= 1 && bytes.length <= 3) {

            if (bytes[0] && parseInt(bytes[0]) <= 127) {
                result.errors.push('First byte must be a "Status Byte", a "Status Byte" always has a value between 128 and 255.');
            }

            if (bytes[1] && (parseInt(bytes[1]) > 127 || parseInt(bytes[1]) < 0)) {
                result.errors.push('Second byte must be a "Data Byte", a "Data Byte" always has a value between 0 and 127.');
            }

            if (bytes[2] && (parseInt(bytes[2]) > 127 || parseInt(bytes[2]) < 0)) {
                result.errors.push('Third byte must be a "Data Byte", a "Data Byte" always has a value between 0 and 127.');
            }

            if (result.errors.length === 0) {
                result.isValid = true;
                const midiMessage = new MidiMessage(bytes);
                result.description = describeMidiMessage(midiMessage);
            }
            return result;
        }

        result.errors.push('Needs to be a binary number of 8 (1 Byte), 16 (2 Bytes) or 24 bits (3 Bytes) long.');
        return result;
    } else {
        return result;
    }
}

function createResult() {
    return {
        isValid: false,
        errors: [],
        description: null
    }
}
