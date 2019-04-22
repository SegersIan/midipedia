function MidiMessage(value) {
    this._message = [];

    if (typeof value === 'string') {
        const byte1 = value.substring(0, 8);
        const byte2 = value.substring(8, 16);
        const byte3 = value.substring(16, 24);

        if (byte1) {
            this._message.push(byte1);
        }
        if (byte2) {
            this._message.push(byte2);
        }
        if (byte3) {
            this._message.push(byte3);
        }

    } else if (Array.isArray(value)) {
        for (const byte of value) {
            this._message.push(parseInt(byte).toString(2).padStart(8, '0'));
        }
    } else {
        throw new Error('NOT SUPPORTED ' + value);
    }
}

function extractChannel(byte) {
    return parseInt(byte.substring(4), 2);
}

MidiMessage.prototype.hasStatusByte = function hasStatusByte() {
    return !!this._message[0];
};

MidiMessage.prototype.getStatusByte = function getStatusByte() {
    return this._message[0];
};

MidiMessage.prototype.hasDataByte1 = function haDataByte1() {
    return !!this._message[1];
};

MidiMessage.prototype.getDataByte1 = function getDataByte1() {
    return this._message[1];
};

MidiMessage.prototype.hasDataByte2 = function haDataByte2() {
    return !!this._message[2];
};

MidiMessage.prototype.getDataByte2 = function getDataByte2() {
    return this._message[2];
};

MidiMessage.prototype.toString = function toString() {
    return this._message[2];
};

export default MidiMessage;
