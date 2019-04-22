<template>
    <div class="byte">
        <div class="bit" v-for="bit of byte">{{bit}}</div>
    </div>
</template>

<script>
    export default {
        name: "midi-byte",
        props: ['byte'],
        computed: {
            values() {
                if (typeof this.byte === "string") {
                    return this.byte.split('');
                }
                return [];
            }
        }
    }
</script>

<style scoped>
    .byte {
        display: flex;
    }

    .bit {
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        flex: 1;
        text-align: center;
        font-weight: bold;
        padding: 5px 0px 5px 0px;
    }

    .bit:last-of-type {
        border-right: 1px solid black;
    }
</style>
