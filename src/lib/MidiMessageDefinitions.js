import MidiMessageDefinition from './MidiMessageDefinition';
import {toByteCode, toNumberCode} from './util';

const createFormatterFn = (label, correction) => (index) => `${label} (channel ${index - correction})`;

const definitions = [
    ...generate({
        startNumber: 128,
        endNumber: 143,
        labelFormatterFn: createFormatterFn(`Note off`, 127),
        dataBytes: [
            {label: 'Note Number'},
            {label: 'Note Velocity'},
        ]
    }),
    ...generate({
        startNumber: 144,
        endNumber: 159,
        labelFormatterFn: createFormatterFn(`Note on`, 143),
        dataBytes: [
            {label: 'Note Number'},
            {label: 'Note Velocity'},
        ]
    }),
    ...generate({
        startNumber: 160,
        endNumber: 175,
        labelFormatterFn: createFormatterFn(`Polyphonic Aftertouch `, 159),
        dataBytes: [
            {label: 'Note Number'},
            {label: 'Pressure'},
        ]
    }),
    generateControlModeChangeMessage({number: 176}),
    ...generate({
        startNumber: 177,
        endNumber: 191,
        labelFormatterFn: createFormatterFn(`Control/Mode Change`, 175),
        dataBytes: [
            {label: 'Control Number'},
            {label: 'Data'},
        ]
    }),
    ...generate({
        startNumber: 192,
        endNumber: 207,
        labelFormatterFn: createFormatterFn(`Program Change `, 191),
        dataBytes: [
            {label: 'Program #'}
        ]
    }),
    ...generate({
        startNumber: 208,
        endNumber: 223,
        labelFormatterFn: createFormatterFn(`Channel Aftertouch`, 207),
        dataBytes: [
            {label: 'Pressure'}
        ]
    }),
    ...generate({
        startNumber: 224,
        endNumber: 239,
        labelFormatterFn: createFormatterFn(`Pitch Bend Change `, 223),
        dataBytes: [
            {label: 'Pitch Bender LSB'},
            {label: 'Pitch Bender MSB'}
        ]
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(240),
        label: `System Exclusive`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(241),
        label: `MIDI Time Code Qtr. Frame`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(242),
        label: `Song Position Pointer`,
        dataBytes: [{label: 'LSB'}, {label: 'MSB'}]
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(243),
        label: `Song Select`,
        dataBytes: [{label: 'song #'}]
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(244),
        label: `Undefined (Reserved)`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(245),
        label: `Undefined (Reserved)`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(246),
        label: `Tune request`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(247),
        label: `End of SysEx (EOX)`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(248),
        label: `Timing clock`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(249),
        label: `Undefined (Reserved)`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(250),
        label: `Start`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(251),
        label: `Continue`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(252),
        label: `Stop`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(253),
        label: `Undefined (Reserved)`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(254),
        label: `Active Sensing`,
        dataBytes: []
    }),
    new MidiMessageDefinition({
        byteCode: toByteCode(255),
        label: `System Reset`,
        dataBytes: []
    })
];

function generate({startNumber, endNumber, dataBytes = [], labelFormatterFn}) {
    const output = [];
    for (let index = startNumber; index <= endNumber; index++) {
        output.push(new MidiMessageDefinition({
            byteCode: toByteCode(index),
            label: labelFormatterFn(index),
            dataBytes: dataBytes
        }))
    }
    return output;
}

function generateControlModeChangeMessage({number}) {
    return new MidiMessageDefinition({
        byteCode: toByteCode(number),
        label: `Control/Mode Change ${number - 175}`,
        dataBytes: [
            {label: 'Control Number'},
            {label: 'Data'},
        ]
    })
}

function get(byteCode) {
    if (typeof byteCode === 'string') {
        return definitions.find((x) => x.byteCode === byteCode);
    } else if (typeof byteCode === 'number') {
        return definitions.find((x) => x.numberCode === byteCode);
    } else {
        throw new TypeError('Code is neither byte nor number.')
    }
}

function exists(byteCode) {
    return !!get(byteCode);
}

export default {
    get,
    exists
};
