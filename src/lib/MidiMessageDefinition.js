import {toNumberCode} from "./util";

export default MidiFunction;

function MidiFunction({ byteCode, label, dataBytes = [] }) {
    // byteCode validation
    if (typeof byteCode !== 'string') {
        throw new TypeError('ByteCode is not a string');
    }
    if (!/^1([01]{7})$/.test(byteCode)) {
        throw new TypeError('ByteCode is a not a valid Status byte, must start with "1"');
    }
    this._byteCode = byteCode;

    // label validation
    if (typeof label !== 'string' || label.length === 0) {
        throw new TypeError('Label has no value');
    }
    this._label = label;

    // dataBytes validation
    if (dataBytes && !Array.isArray(dataBytes)) {
        throw new TypeError('DataBytes must be an array');
    }
    if (dataBytes.length > 0 && dataBytes.some(x => !x.label)) {
        throw new TypeError('All DataBytes items must have the property "label"');
    }
    if (dataBytes.length > 2) {
        throw new TypeError('Too many DataBytes, max is 2.');
    }
    this._dataBytes = dataBytes;
}

Object.defineProperty(MidiFunction.prototype, 'byteCode', {
    get: function () {
        return this._byteCode;
    }
});

Object.defineProperty(MidiFunction.prototype, 'label', {
    get: function () {
        return this._label;
    }
});

Object.defineProperty(MidiFunction.prototype, 'numberCode', {
    get: function () {
        return toNumberCode(this._byteCode);
    }
});

Object.defineProperty(MidiFunction.prototype, 'dataBytes', {
    get: function () {
        return this._dataBytes;
    }
});

Object.defineProperty(MidiFunction.prototype, 'dataBytesLength', {
    get: function () {
        return this._dataBytes.length;
    }
});


