const BYTE_TYPE = {
    STATUS: 'Status Byte',
    DATA: 'Data Byte',
    UNKNOWN: 'Unknown Byte Type'
};




const MESSAGE_TYPES = {
    NOTE_OFF: {
        statusByte: x => x,
        dataBytes: [
            x => x,
            x => x
        ]
    }
};



function MidiByte(value) {
    if (typeof value === 'number') {
        this._decValue = parseInt(value, 10);
        this._binValue = this
            ._decValue
            .toString(2)
            .padStart(8, '0');
    } else if (typeof value === 'string') {
        this._decValue = parseInt(value, 2);
        this._binValue = value;
    } else {
        throw new Error(`Unsupported MIDIByte ${value}`);
    }
}

MidiByte.prototype.getByteType = function getByteType() {
    if (this._binValue.startsWith('1')) {
        return BYTE_TYPE.STATUS;
    } else if (this._binValue.startsWith('0')) {
        return BYTE_TYPE.DATA;
    } else {
        return BYTE_TYPE.UNKNOWN;
    }
};

MidiByte.prototype.isStatusByte = function isStatusByte() {
    return this.getByteType() === BYTE_TYPE.STATUS;
};

MidiByte.prototype.isDataByte = function isStatusByte() {
    return this.getByteType() === BYTE_TYPE.DATA;
};

MidiByte.prototype.getDecValue = function getDecValue() {
    return this._decValue;
};

MidiByte.prototype.getBinValue = function getBinValue() {
    return this._binValue;
};

MidiByte.prototype.getDescription = function getDescription() {
    const startValue = this._binValue.substring(0, 4);
    console.log(startValue);
    if (startValue in STATUS_BYTE_MAP) {
        return STATUS_BYTE_MAP[startValue](this._binValue);
    } else {
        return 'UNKNOWN';
    }
};

export default MidiByte;
