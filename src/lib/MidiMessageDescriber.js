export default describeMidiMessage;

function describeMidiMessage(midiMessage) {
    const statusByte = midiMessage.getStatusByte();
    const statusAsDec = parseInt(statusByte, 2);
    if (statusAsDec >= 128 && statusAsDec <= 143) {
        const description = `Note "Off" for channel ${extractChannel(statusByte)}` +
            `, Note Number ${toDec(midiMessage.getDataByte1())}` +
            `, Note Velocity ${toDec(midiMessage.getDataByte2())}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Note "Off" for channel ${extractChannel(statusByte)}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Note Number ${toDec(midiMessage.getDataByte1())}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte2()),
                    valueAsBin: midiMessage.getDataByte2(),
                    description: `Note Velocity ${toDec(midiMessage.getDataByte2())}`
                },
            ]
        };
    } else if (statusAsDec >= 144 && statusAsDec <= 159) {
        const description = `Note "On" for channel ${extractChannel(statusByte)}` +
            `, with note number ${toDec(midiMessage.getDataByte1())}` +
            `, and note velocity ${toDec(midiMessage.getDataByte2())}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Note "On" (channel = ${extractChannel(statusByte)})`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Note Number = ${toDec(midiMessage.getDataByte1())}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte2()),
                    valueAsBin: midiMessage.getDataByte2(),
                    description: `Note Velocity = ${toDec(midiMessage.getDataByte2())}`
                },
            ]
        };
    } else if (statusAsDec >= 160 && statusAsDec <= 175) {
        const description = `Polyphonic Aftertouch for channel ${extractChannel(statusByte)}` +
            ` Note Number ${toDec(midiMessage.getDataByte1())}` +
            ` Pressure ${toDec(midiMessage.getDataByte2())}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Polyphonic Aftertouch for channel ${extractChannel(statusByte)}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Note Number ${toDec(midiMessage.getDataByte1())}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte2()),
                    valueAsBin: midiMessage.getDataByte2(),
                    description: `Pressure ${toDec(midiMessage.getDataByte2())}`
                },
            ]
        };
    } else if (statusAsDec >= 176 && statusAsDec <= 191) {
        const description = `Control/Mode Change for channel ${extractChannel(statusByte)}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Control/Mode Change for channel ${extractChannel(statusByte)}`
                },
                // TODO !!!
            ]
        };
    } else if (statusAsDec >= 192 && statusAsDec <= 207) {
        const description = `Program Change for channel ${extractChannel(statusByte)}` +
            ` Program # ${toDec(midiMessage.getDataByte1())}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Program Change for channel ${extractChannel(statusByte)}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Program # ${toDec(midiMessage.getDataByte1())}`
                }
            ]
        };
    } else if (statusAsDec >= 208 && statusAsDec <= 223) {
        const description = `Channel Aftertouch for channel ${extractChannel(statusByte)}` +
            ` Pressure # ${toDec(midiMessage.getDataByte1())}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Channel Aftertouch for channel ${extractChannel(statusByte)}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Pressure # ${toDec(midiMessage.getDataByte1())}`
                }
            ]
        };
    } else if (statusAsDec >= 224 && statusAsDec <= 239) {
        const description = `Pitch Bend Change for channel ${extractChannel(statusByte)}` +
            ` Pitch Bender LSB # ${toDec(midiMessage.getDataByte1())}` +
            ` Pitch Bender MSB # ${toDec(midiMessage.getDataByte2())}`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: `Pitch Bend Change for channel ${extractChannel(statusByte)}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Pitch Bender LSB # ${toDec(midiMessage.getDataByte1())}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Pitch Bender MSB # ${toDec(midiMessage.getDataByte2())}`
                }
            ]
        };
    } else if (statusAsDec === 240) {
        const description = 'System Exclusive';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 241) {
        const description = 'MIDI Time Code Qtr. Frame';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 242) {
        const description = `Song Position Pointer (LSB ${toDec(midiMessage.getDataByte1())} MSB ${toDec(midiMessage.getDataByte2())})`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: 'Song Position Pointer'
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `LSB # ${toDec(midiMessage.getDataByte1())}`
                },
                {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `MSB # ${toDec(midiMessage.getDataByte2())}`
                }
            ]
        };
    } else if (statusAsDec === 243) {
        const description = `Song Select (Song # ${toDec(midiMessage.getDataByte1())})`;
        return {
            description: description,
            byteDescriptions: [
                {
                    type: 'STATUS',
                    valueAsDec: statusAsDec,
                    valueAsBin: statusByte,
                    description: 'Song Select'
                }, {
                    type: 'DATA',
                    valueAsDec: toDec(midiMessage.getDataByte1()),
                    valueAsBin: midiMessage.getDataByte1(),
                    description: `Song # ${toDec(midiMessage.getDataByte1())}`
                }]
        };
    } else if (statusAsDec === 244) {
        const description = 'Undefined (Reserved)';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 245) {
        const description = 'Undefined (Reserved)';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 246) {
        const description = 'Tune request';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 247) {
        const description = 'End of SysEx (EOX)';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 248) {
        const description = 'Timing clock';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 249) {
        const description = 'Undefined (Reserved)';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 250) {
        const description = 'Start';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 251) {
        const description = 'Continue';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 252) {
        const description = 'Stop';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 253) {
        const description = 'Undefined (Reserved)';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 254) {
        const description = 'Active Sensing';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    } else if (statusAsDec === 255) {
        const description = 'System Reset';
        return {
            description: description,
            byteDescriptions: [{
                type: 'STATUS',
                valueAsDec: statusAsDec,
                valueAsBin: statusByte,
                description: description
            }]
        };
    }
}

function extractChannel(byte) {
    return parseInt(byte.substring(4), 2) + 1;
}

function toDec(value) {
    return parseInt(value, 2);
}
