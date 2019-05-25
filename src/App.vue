<template>
    <div id="app" class="app" :class="{ 'darkmode' : darkModeOn }">
        <header>

            <h1>WebApiStudio.com {{$router.currentRoute.name | formatPath}}</h1>
            <span style="cursor: pointer" @click="toggleDarkMode">Toggle Darkmode</span>

        </header>

        <main>

            <div class="nav">
                <router-link tag="div" class="nav__item" to="/">Home</router-link>
                <router-link tag="div" class="nav__item" to="/midi-debugger">MIDI Debugger</router-link>
                <router-link tag="div" class="nav__item" to="/gamepad-debugger">Gamepad Debugger</router-link>
                <router-link tag="div" class="nav__item" to="/gamepad-studio">PS4 Studio</router-link>
                <router-link tag="div" class="nav__item" to="/about">About</router-link>
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

    h1, h2, h3, h4, h5, h6{
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
        cursor: pointer;
        padding: 10px;
    }

    .nav__item:hover {
        background-color: lightblue;
    }


    .darkmode .nav__item:hover {
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

    hr{
        border: 1px dashed;
        width: 20%;
    }


</style>
