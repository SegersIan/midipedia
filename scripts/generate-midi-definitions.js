const {createDefaultOneBytes, createDefaultTwoBytes, createControlModeChange, createDefault} = require('./utils');
const fs = require('fs');
const midiDefinitions = [];

const START_INDEX = 128;
const STOP_INDEX = 239;

for (let index = START_INDEX; index <= STOP_INDEX; index++) {

    if (index >= 128 && index <= 143) {
        midiDefinitions.push(createDefaultTwoBytes({
            value: index,
            statusLabel: `Chan ${index - 127} Note Off`,
            byteLabel1: `Note Number`,
            byteLabel2: `Note Velocity`,
        }));
        continue;
    }

    if (index >= 144 && index <= 159) {
        midiDefinitions.push(createDefaultTwoBytes({
            value: index,
            statusLabel: `Chan ${index - 143} Note On`,
            byteLabel1: `Note Number`,
            byteLabel2: `Note Velocity`,
        }));
        continue;
    }

    if (index >= 160 && index <= 175) {
        midiDefinitions.push(createDefaultTwoBytes({
            value: index,
            statusLabel: `Chan ${index - 159} Polyphonic Aftertouch`,
            byteLabel1: `Note Number`,
            byteLabel2: `Pressure`,
        }));
        continue;
    }

    if (index >= 176 && index <= 191) {
        midiDefinitions.push(createControlModeChange({
            value: index,
            statusLabel: `Chan ${index - 175} Control/Mode Change`,
            byteLabel1: `Program #`
        }));
        continue;
    }

    if (index >= 192 && index <= 207) {
        midiDefinitions.push(createDefaultOneBytes({
            value: index,
            statusLabel: `Chan ${index - 191} Program Change`,
            byteLabel1: `Program #`
        }));
        continue;
    }

    if (index >= 208 && index <= 223) {
        midiDefinitions.push(createDefaultOneBytes({
            value: index,
            statusLabel: `Chan ${index - 207} Channel Aftertouch`,
            byteLabel1: `Pressure`
        }));
        continue;
    }

    if (index >= 224 && index <= 239) {
        midiDefinitions.push(createDefaultTwoBytes({
            value: index,
            statusLabel: `Chan ${index - 223} Pitch Bend Change`,
            byteLabel1: `Pitch Bender LSB`,
            byteLabel2: `Pitch Bender MSB`,
        }));
        continue;
    }

}

midiDefinitions.push(createDefaultTwoBytes({
    value: 240,
    statusLabel: `System Exclusive`,
    byteLabel1: `VendorId`,
    byteLabel2: `Data byte`,
}));

midiDefinitions.push(createDefaultTwoBytes({
    value: 241,
    statusLabel: `MIDI Time Code Qtr. Frame`,
    byteLabel1: `-see spec-`,
    byteLabel2: `-see spec-`,
}));

midiDefinitions.push(createDefaultTwoBytes({
    value: 242,
    statusLabel: `MIDI Time Code Qtr. Frame`,
    byteLabel1: `LSB`,
    byteLabel2: `MSB`,
}));

midiDefinitions.push(createDefaultOneBytes({
    value: 243,
    statusLabel: `Song Select`,
    byteLabel1: `Song #`
}));

midiDefinitions.push(createDefault({
    value: 244,
    statusLabel: `Undefined (Reserved)`
}));

midiDefinitions.push(createDefault({
    value: 245,
    statusLabel: `Undefined (Reserved)`
}));

midiDefinitions.push(createDefault({
    value: 246,
    statusLabel: `Tune request`
}));

midiDefinitions.push(createDefault({
    value: 247,
    statusLabel: `End of SysEx (EOX)`
}));

midiDefinitions.push(createDefault({
    value: 248,
    statusLabel: `Timing clock`
}));

midiDefinitions.push(createDefault({
    value: 249,
    statusLabel: `Undefined (Reserved)`
}));

midiDefinitions.push(createDefault({
    value: 250,
    statusLabel: `Start`
}));

midiDefinitions.push(createDefault({
    value: 251,
    statusLabel: `Continue`
}));

midiDefinitions.push(createDefault({
    value: 252,
    statusLabel: `Stop`
}));

midiDefinitions.push(createDefault({
    value: 253,
    statusLabel: `Undefined (Reserved)`
}));

midiDefinitions.push(createDefault({
    value: 254,
    statusLabel: `Active Sensing`
}));

midiDefinitions.push(createDefault({
    value: 255,
    statusLabel: `System Reset`
}));

fs.writeFileSync('output.json', JSON.stringify(midiDefinitions, null, 0));