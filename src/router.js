import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MidiDebugger from './views/MidiDebugger.vue'
import About from './views/About.vue'
import GamepadStudio from './views/GamepadStudio';
import GamepadDebugger from './views/GamepadDebugger';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/midi-debugger',
      name: 'MIDI Debugger',
      component: MidiDebugger
    },
    {
      path: '/gamepad-debugger',
      name: 'Gamepad Debugger',
      component: GamepadDebugger
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/gamepad-studio',
      name: 'Gamepad Studio',
      component: GamepadStudio
    }
  ]
})
