const doNothing = () => ({});

const EVENT_TYPE = {
    CONNECTED: 'gamepadconnected',
    DISCONNECTED: 'gamepaddisconnected',
};

export function addEventListeners({onConnected, onDisconnected}) {
    window.addEventListener(EVENT_TYPE.CONNECTED, onConnected);
    window.addEventListener(EVENT_TYPE.DISCONNECTED, onDisconnected);
}

export function getGamepads() {
    return navigator.getGamepads();
}