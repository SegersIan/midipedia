import MidiMessageDefinitions from './MidiMessageDefinitions';
import {toNumberCode} from "./util";
import Definitions from './MidiMessageDefinitions.json';

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
    const definitionA = Definitions.find(x => x.byte.binary === statusByte);
    let depth = 1;

    const definition = MidiMessageDefinitions.get(statusByte);

    const output = {
        description: 'description',
        expectedBytes: 1,
        byteDescriptions: [
            {
                type: BYTE_TYPES.status,
                valueAsDec: definitionA.byte.dec,
                valueAsBin: definitionA.byte.binary,
                valueAsHex: '0x' + definitionA.byte.binary,
                description: definitionA.byte.label,
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

        if (definitionA.next) {

            if (Array.isArray(definitionA.next)) {
                const byte1Def = definitionA.next.find(x => x.byte.binary === dataByte1);
                byteDescription.description = byte1Def.byte.label;
            } else {
                byteDescription.description = definitionA.next.byte.label + ' ' + toNumberCode(dataByte1);
            }
            output.expectedBytes += 1;
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

        const byte1Def = definitionA.next.find(x => x.byte.binary === dataByte1);
        if (byte1Def && byte1Def.next) {
            if (Array.isArray(byte1Def.next)) {
                const byte2Def = byte1Def.next.find(x => x.byte.binary === dataByte2);
                byteDescription.description = byte2Def.byte.label;
            } else {
                byteDescription.description = byte1Def.next.byte.label + ' ' + toNumberCode(dataByte2);
            }
            output.expectedBytes += 1;
            byteDescription.isExpected = true;
        } else {
            byteDescription.description = DESCRIPTION.notExpected;
            byteDescription.isExpected = false;
        }
        output.byteDescriptions.push(byteDescription);

    } else {
        return output;
    }

    output.description = output.byteDescriptions.map(({description}) => description).join(', ');

    return output
}
