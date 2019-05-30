module.exports = {
    toByteCode,
    toHexCode,
    createDefault,
    createDefaultTwoBytes,
    createDefaultOneBytes,
    createControlModeChange
};

function toByteCode(value) {
    return Number(value)
        .toString(2)
        .padStart(8, '0');
}

function toHexCode(value) {
    return Number(value)
        .toString(16)
        .padStart(2, '0');
}

function createDefaultTwoBytes({value, statusLabel, byteLabel1, byteLabel2}) {
    return {
        byte: {
            "type": "status",
            "valueType": "function",
            "hex": toHexCode(value),
            "dec": value,
            "binary": toByteCode(value),
            "label": statusLabel
        },
        next: {
            byte: {
                "type": "data",
                "valueType": "value",
                "label": byteLabel1
            },
            next: {
                byte: {
                    "type": "data",
                    "valueType": "value",
                    "label": byteLabel2
                },
                next: null
            }
        }
    }
}

function createDefault({value, statusLabel}) {
    return {
        byte: {
            "type": "status",
            "valueType": "function",
            "hex": toHexCode(value),
            "dec": value,
            "binary": toByteCode(value),
            "label": statusLabel
        },
        next: null
    }
}

function createDefaultOneBytes({value, statusLabel, byteLabel1}) {
    return {
        byte: {
            "type": "status",
            "valueType": "function",
            "hex": toHexCode(value),
            "dec": value,
            "binary": toByteCode(value),
            "label": statusLabel
        },
        next: {
            byte: {
                "type": "data",
                "valueType": "value",
                "label": byteLabel1
            },
            next: null
        }
    }
}

function createControlModeChange({value, statusLabel}){
    return {
        byte: {
            "type": "status",
            "valueType": "function",
            "hex": toHexCode(value),
            "dec": value,
            "binary": toByteCode(value),
            "label": statusLabel
        },
        next: createControlModeChangeDataByte1()
    }
}

function createControlModeChangeDataByte1() {
    return [
        createOne(0, 'Bank Select', createLast('Value (used as MSB)')),
        createOne(1, 'Modulation Wheel or Lever', createLast('Value (used as MSB)')),
        createOne(2, 'Breath Controller', createLast('Value (used as MSB)')),
        createOne(3, 'Undefined', createLast('Value (used as MSB)')),
        createOne(4, 'Foot Controller', createLast('Value (used as MSB)')),
        createOne(5, 'Portamento Time', createLast('Value (used as MSB)')),
        createOne(6, 'Data Entry MSB', createLast('Value (used as MSB)')),
        createOne(7, 'Channel Volume (formerly Main Volume)', createLast('Value (used as MSB)')),
        createOne(8, 'Balance', createLast('Value (used as MSB)')),
        createOne(9, 'Undefined', createLast('Value (used as MSB)')),
        createOne(10, 'Pan', createLast('Value (used as MSB)')),
        createOne(11, 'Expression Controller', createLast('Value (used as MSB)')),
        createOne(12, 'Effect Control 1', createLast('Value (used as MSB)')),
        createOne(13, 'Effect Control 2', createLast('Value (used as MSB)')),
        createOne(14, 'Undefined', createLast('Value (used as MSB)')),
        createOne(15, 'Undefined', createLast('Value (used as MSB)')),
        createOne(16, 'General Purpose Controller 1', createLast('Value (used as MSB)')),
        createOne(17, 'General Purpose Controller 2', createLast('Value (used as MSB)')),
        createOne(18, 'General Purpose Controller 3', createLast('Value (used as MSB)')),
        createOne(19, 'General Purpose Controller 4', createLast('Value (used as MSB)')),
        createOne(20, 'Undefined', createLast('Value (used as MSB)')),
        createOne(21, 'Undefined', createLast('Value (used as MSB)')),
        createOne(22, 'Undefined', createLast('Value (used as MSB)')),
        createOne(23, 'Undefined', createLast('Value (used as MSB)')),
        createOne(24, 'Undefined', createLast('Value (used as MSB)')),
        createOne(25, 'Undefined', createLast('Value (used as MSB)')),
        createOne(26, 'Undefined', createLast('Value (used as MSB)')),
        createOne(27, 'Undefined', createLast('Value (used as MSB)')),
        createOne(28, 'Undefined', createLast('Value (used as MSB)')),
        createOne(29, 'Undefined', createLast('Value (used as MSB)')),
        createOne(30, 'Undefined', createLast('Value (used as MSB)')),
        createOne(31, 'Undefined', createLast('Value (used as MSB)')),
        createOne(32, 'LSB for Control 0 (Bank Select)', createLast('Value (used as LSB)')),
        createOne(33, 'LSB for Control 1 (Modulation Wheel or Lever)', createLast('Value (used as LSB)')),
        createOne(34, 'LSB for Control 2 (Breath Controller)', createLast('Value (used as LSB)')),
        createOne(35, 'LSB for Control 3 (Undefined)', createLast('Value (used as LSB)')),
        createOne(36, 'LSB for Control 4 (Foot Controller)', createLast('Value (used as LSB)')),
        createOne(37, 'LSB for Control 5 (Portamento Time)', createLast('Value (used as LSB)')),
        createOne(38, 'LSB for Control 6 (Data Entry)', createLast('Value (used as LSB)')),
        createOne(39, 'LSB for Control 7 (Channel Volume, formerly Main Volume)', createLast('Value (used as LSB)')),
        createOne(40, 'LSB for Control 8 (Balance)', createLast('Value (used as LSB)')),
        createOne(41, 'LSB for Control 9 (Undefined)', createLast('Value (used as LSB)')),
        createOne(42, 'LSB for Control 10 (Pan)', createLast('Value (used as LSB)')),
        createOne(43, 'LSB for Control 11 (Expression Controller)', createLast('Value (used as LSB)')),
        createOne(44, 'LSB for Control 12 (Effect control 1)', createLast('Value (used as LSB)')),
        createOne(45, 'LSB for Control 13 (Effect control 2)', createLast('Value (used as LSB)')),
        createOne(46, 'LSB for Control 14 (Undefined)', createLast('Value (used as LSB)')),
        createOne(47, 'LSB for Control 15 (Undefined)', createLast('Value (used as LSB)')),
        createOne(48, 'LSB for Control 16 (General Purpose Controller 1)', createLast('Value (used as LSB)')),
        createOne(49, 'LSB for Control 17 (General Purpose Controller 2)', createLast('Value (used as LSB)')),
        createOne(50, 'LSB for Control 18 (General Purpose Controller 3)', createLast('Value (used as LSB)')),
        createOne(51, 'LSB for Control 19 (General Purpose Controller 4)', createLast('Value (used as LSB)')),
        createOne(52, 'LSB for Control 20 (Undefined)', createLast('Value (used as LSB)')),
        createOne(53, 'LSB for Control 21 (Undefined)', createLast('Value (used as LSB)')),
        createOne(54, 'LSB for Control 22 (Undefined)', createLast('Value (used as LSB)')),
        createOne(55, 'LSB for Control 23 (Undefined)', createLast('Value (used as LSB)')),
        createOne(56, 'LSB for Control 24 (Undefined)', createLast('Value (used as LSB)')),
        createOne(57, 'LSB for Control 25 (Undefined)', createLast('Value (used as LSB)')),
        createOne(58, 'LSB for Control 26 (Undefined)', createLast('Value (used as LSB)')),
        createOne(59, 'LSB for Control 27 (Undefined)', createLast('Value (used as LSB)')),
        createOne(60, 'LSB for Control 28 (Undefined)', createLast('Value (used as LSB)')),
        createOne(61, 'LSB for Control 29 (Undefined)', createLast('Value (used as LSB)')),
        createOne(62, 'LSB for Control 30 (Undefined)', createLast('Value (used as LSB)')),
        createOne(63, 'LSB for Control 31 (Undefined)', createLast('Value (used as LSB)')),
        createOne(64, 'Damper Pedal on/off (Sustain)', createLast('≤63 off, ≥64 on')),
        createOne(65, 'Portamento On/Off', createLast('≤63 off, ≥64 on')),
        createOne(66, 'Sostenuto On/Off', createLast('≤63 off, ≥64 on')),
        createOne(67, 'Soft Pedal On/Off', createLast('≤63 off, ≥64 on')),
        createOne(68, 'Legato Footswitch', createLast('≤63 Normal, ≥64 Legato')),
        createOne(69, 'Hold 2', createLast('≤63 off, ≥64 on')),
        createOne(70, 'Sound Controller 1 (default: Sound Variation)', createLast('Value (used as LSB)')),
        createOne(71, 'Sound Controller 2 (default: Timbre/Harmonic Intens.)', createLast('Value (used as LSB)')),
        createOne(72, 'Sound Controller 3 (default: Release Time)', createLast('Value (used as LSB)')),
        createOne(73, 'Sound Controller 4 (default: Attack Time)', createLast('Value (used as LSB)')),
        createOne(74, 'Sound Controller 5 (default: Brightness)', createLast('Value (used as LSB)')),
        createOne(75, 'Sound Controller 6 (default: Decay Time - see MMA RP-021)', createLast('Value (used as LSB)')),
        createOne(76, 'Sound Controller 7 (default: Vibrato Rate - see MMA RP-021)', createLast('Value (used as LSB)')),
        createOne(77, 'Sound Controller 8 (default: Vibrato Depth - see MMA RP-021)', createLast('Value (used as LSB)')),
        createOne(78, 'Sound Controller 9 (default: Vibrato Delay - see MMA RP-021)', createLast('Value (used as LSB)')),
        createOne(79, 'Sound Controller 10 (default undefined - see MMA RP-021)', createLast('Value (used as LSB)')),
        createOne(80, 'General Purpose Controller 5', createLast('Value (used as LSB)')),
        createOne(81, 'General Purpose Controller 6', createLast('Value (used as LSB)')),
        createOne(82, 'General Purpose Controller 7', createLast('Value (used as LSB)')),
        createOne(83, 'General Purpose Controller 8', createLast('Value (used as LSB)')),
        createOne(84, 'Portamento Control', createLast('Value (used as LSB)')),
        createOne(85, 'Undefined'),
        createOne(86, 'Undefined'),
        createOne(87, 'Undefined'),
        createOne(88, 'High Resolution Velocity Prefix', createLast('Value (used as LSB)')),
        createOne(89, 'Undefined'),
        createOne(90, 'Undefined'),
        createOne(91, 'Effects 1 Depth (formerly External Effects Depth)', createLast('Value')),
        createOne(92, 'Effects 2 Depth (formerly Tremolo Depth)', createLast('Value')),
        createOne(93, 'Effects 3 Depth (formerly Chorus Depth)', createLast('Value')),
        createOne(94, 'Effects 4 Depth (formerly Celeste [Detune] Depth)', createLast('Value')),
        createOne(95, 'Effects 5 Depth (formerly Phaser Depth)', createLast('Value')),
        createOne(96, 'Data Increment (Data Entry +1) (see MMA RP-018)'),
        createOne(97, 'Data Decrement (Data Entry -1) (see MMA RP-018)'),
        createOne(98, 'Non-Registered Parameter Number (NRPN) - LSB', createLast('Value (used as LSB)')),
        createOne(99, 'Non-Registered Parameter Number (NRPN) - MSB', createLast('Value (used as MSB)')),
        createOne(100, 'Registered Parameter Number (RPN) - LSB*', createLast('Value (used as LSB)')),
        createOne(101, 'Registered Parameter Number (RPN) - MSB*', createLast('Value (used as MSB)')),
        createOne(102, 'Undefined'),
        createOne(103, 'Undefined'),
        createOne(104, 'Undefined'),
        createOne(105, 'Undefined'),
        createOne(106, 'Undefined'),
        createOne(107, 'Undefined'),
        createOne(108, 'Undefined'),
        createOne(109, 'Undefined'),
        createOne(110, 'Undefined'),
        createOne(111, 'Undefined'),
        createOne(112, 'Undefined'),
        createOne(113, 'Undefined'),
        createOne(114, 'Undefined'),
        createOne(115, 'Undefined'),
        createOne(116, 'Undefined'),
        createOne(117, 'Undefined'),
        createOne(118, 'Undefined'),
        createOne(119, 'Undefined'),
        createOne(120, '[Channel Mode Message] All Sound Off', createLast('Value')),
        createOne(121, '[Channel Mode Message] Reset All Controllers ', createLast('Value')),
        createOne(122, '[Channel Mode Message] Local Control On/Off', createLast('Value (0 off, 127 on)')),
        createOne(123, '[Channel Mode Message] All Notes Off', createLast('Value')),
        createOne(124, '[Channel Mode Message] Omni Mode Off (+ all notes off)', createLast('Value')),
        createOne(125, '[Channel Mode Message] Omni Mode On (+ all notes off)', createLast('Value')),
        createOne(126, '[Channel Mode Message] Mono Mode On (+ poly off, + all notes off)'),
        createOne(127, '[Channel Mode Message] Poly Mode On (+ mono off, +all notes off)', createLast('Value'))
    ];

    function createOne(value, label, next = null) {
        return  {
            byte: {
                "type": "status",
                "valueType": "function",
                "hex": toHexCode(value),
                "dec": value,
                "binary": toByteCode(value),
                "label": label
            },
            next: next
        }
    }

    function createLast(label) {
        return {
            byte: {
                "type": "status",
                    "valueType": "value",
                    "label": label
            },
            next: null
        }
    }
}