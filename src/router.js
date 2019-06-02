import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MidiDebugger from './views/MidiDebugger.vue'
import MidiExplained from './views/MidiExplained';
import MidiSender from './views/MidiSender';
import GamepadMidiController from './views/GamepadMidiController';
import GamepadDebugger from './views/GamepadDebugger';
import TraktorStudio from './views/TraktorStudio';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/midi/explained',
            name: 'MIDI explained',
            component: MidiExplained
        },
        {
            path: '/midi/debugger',
            name: 'MIDI Debugger',
            component: MidiDebugger
        },
        {
            path: '/gamepad/debugger',
            name: 'Gamepad Debugger',
            component: GamepadDebugger
        },
        {
            path: '/project/gamepad-midi-controller',
            name: 'Gamepad As MIDI controller',
            component: GamepadMidiController
        },
        {
            path: '/project/traktorstudio',
            name: 'Traktor Studio',
            component: TraktorStudio
        },
        {
            path: '/midi/sender',
            name: 'Send MIDI messages to Output',
            component: MidiSender
        }
    ]
})
