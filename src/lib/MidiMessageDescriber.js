import MidiMessageDefinitions from './MidiMessageDefinitions';
import {toNumberCode} from "./util";

const BYTE_TYPES = {
    status: 'STATUS',
    data: 'DATA'
};

const DESCRIPTION = {
    notSet: 'Not Set',
    notExpected: 'Unexpected Data Byte'
};

export default describeMidiMessage;

function describeMidiMessage(midiMessage) {
    const statusByte = midiMessage.getStatusByte();

    const definition = MidiMessageDefinitions.get(statusByte);
    const output = {
        description: 'description',
        expectedBytes: definition.dataBytesLength + 1,
        byteDescriptions: [
            {
                type: BYTE_TYPES.status,
                valueAsDec: definition.numberCode,
                valueAsBin: definition.byteCode,
                description: definition.label,
                isExpected: true
            }
        ]
    };

    const dataByte1 = midiMessage.getDataByte1();
    if (dataByte1) {
        const byteDescription = {
            type: BYTE_TYPES.data,
            valueAsDec: toNumberCode(dataByte1),
            valueAsBin: dataByte1,
            description: DESCRIPTION.notSet,
            isExpected: false
        };
        if (definition.dataBytes[0]) {
            if( typeof definition.dataBytes[0].label === 'function'){
                byteDescription.description = definition.dataBytes[0].label(toNumberCode(dataByte1));
            }else{
                byteDescription.description = definition.dataBytes[0].label + ' ' + toNumberCode(dataByte1);
            }
            byteDescription.isExpected = true;
        } else {
            byteDescription.description = DESCRIPTION.notExpected;
            byteDescription.isExpected = false;
        }
        output.byteDescriptions.push(byteDescription);
    } else {
        return output;
    }

    const dataByte2 = midiMessage.getDataByte2();
    if (dataByte2) {
        const byteDescription = {
            type: BYTE_TYPES.data,
            valueAsDec: toNumberCode(dataByte2),
            valueAsBin: dataByte2,
            description: DESCRIPTION.notSet,
            isExpected: false
        };
        if (definition.dataBytes[1]) {
            byteDescription.description = definition.dataBytes[1].label + ' ' + toNumberCode(dataByte1);
            byteDescription.isExpected = true;
        } else {
            byteDescription.description = DESCRIPTION.notExpected;
            byteDescription.isExpected = false;
        }
        output.byteDescriptions.push(byteDescription);
    }

    output.description = output.byteDescriptions.map(({description}) => description).join(', ');

    return output
}
