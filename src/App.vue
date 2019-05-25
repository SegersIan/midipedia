<template>
    <div id="app" class="app" :class="{ 'darkmode' : darkModeOn }">
        <header style="display: flex; justify-content: space-between">
            <div>
                <h1 style="margin: 0">WebApiStudio.com {{$router.currentRoute.name | formatPath}}</h1>
            </div>
            <div style="padding: 12px 10px 0 0">
                <span style="cursor: pointer" @click="toggleDarkMode">Toggle Darkmode</span>
            </div>
        </header>

        <main>

            <div class="nav">
                <div class="nav__item nav__header">General</div>
                <router-link tag="div" class="nav__item nav__link" to="/">Home</router-link>
                <router-link tag="div" class="nav__item nav__link" to="/about">About</router-link>
                <div class="nav__item nav__header">MIDI</div>
                <router-link tag="div" class="nav__item nav__link" to="/midi-explained">Explained</router-link>
                <router-link tag="div" class="nav__item nav__link" to="/midi-debugger">Message Debugger</router-link>
                <div class="nav__item nav__header">Gamepad</div>
                <router-link tag="div" class="nav__item nav__link" to="/gamepad-debugger">Debugger</router-link>
                <div class="nav__item nav__header">Projects</div>
                <router-link tag="div" class="nav__item nav__link" to="/gamepad-midi-controller">Gamepad + Midi
                </router-link>
            </div>

            <div class="content">
                <router-view/>
            </div>

        </main>

        <footer class="text-center">
            Created with ❤ by <a href="http://www.segersian.com" target="_blank">Segers Ian</a>
        </footer>

    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                darkModeOn: false
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                const value = localStorage.getItem('darkmode');
                if (value && value.toLowerCase() === 'true') {
                    this.darkModeOn = true;
                }
            },
            toggleDarkMode() {
                this.darkModeOn = !this.darkModeOn;
                localStorage.setItem('darkmode', this.darkModeOn.toString());
            }

        },
        filters: {
            formatPath(value) {
                return `:: ${value}`;
            }
        }
    }
</script>

<style>

    html, body, header, main, footer, div, h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 20px 0 20px 0;
    }

    .app {
        font-family: American Typewriter, serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100vh;
    }

    .darkmode {
        background-color: #000000;
        color: gray;
    }

    header {
        padding: 5px 0 5px 10px;
        margin: 0 0 10px 0;
    }

    main {
        display: flex;
        min-height: calc(100vh - 120px);
    }

    .nav {
        flex: 1;
        margin: 0px 10px 0 0;
    }

    .nav__item {
        padding: 10px;
    }

    .nav__header {
        font-weight: bold;
    }

    .nav__link{
        cursor: pointer;
    }

    .nav__link:hover {
        background-color: lightblue;
    }

    .darkmode .nav__link:hover {
        background-color: darkgray;
        color: black;
    }

    .content {
        flex: 6;
    }

    footer {
        text-align: center;
        padding: 10px 0 10px 0;
    }

    .text-center {
        text-align: center;
    }

    .center {
        margin: 0 auto 0 auto;
    }

    hr {
        border: 1px dashed;
        width: 20%;
    }


</style>
