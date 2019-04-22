<template>
    <div id="app">
        <router-view/>
        <footer class="text-center">
            Created with ❤ by <a href="http://www.segersian.com" target="_blank">Segers Ian</a>
        </footer>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .text-center{
        text-align: center;
    }

    .center {
        margin: 0 auto 0 auto;

    }

    footer{
        margin-top: 50px;
    }

</style>
