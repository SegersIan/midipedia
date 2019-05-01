<template>
    <div class="home">
        <h2>Welcome to MyMIDI.studio</h2>
        <p>A small playground to experiment with MIDI!</p>


        <h3>What is MIDI?</h3>
        <p>
            MIDI stands for <span class="bold">M</span>usic <span class="bold">I</span>nstrument
            <span class="bold">D</span>igital <span class="bold">I</span>nterface. This interface is used to
            communicate
            between music instruments, <a href="https://en.wikipedia.org/wiki/MIDI" target="_blank">check the
            Wiki.</a>
        </p>
        <p>
            The MIDI protocol communicates by sending "messages" to all connected devices. These messages
            describe
            instructions that other devices can decide to consume or ignore.
        </p>

        <h3>How are MIDI messages constructed?</h3>
        <p>Such a "message" exists out of 1, 2 or 3 bytes. The first byte is known as a "status" byte, the
            subsequent
            bytes are known as "data" bytes. A "message" has always a status byte, but optionally has data bytes
            depending
            the MIDI specification.
        </p>

        <p>
            A status byte it's MSB is always "1" <br>
            A data byte it's MSB is always "0"
        </p>

        <h3>What is a MSB?</h3>
        <p>Most Significant Bit, this is the first (most left) bit of a binary number or byte.
            <br> (e.g. The MSB of the binary number "<span class="bold">1</span>000" is "<span
                    class="bold">1</span>")
        </p>

        <h3>What is a LSB?</h3>
        <p>Least Significant Bit, this is the last (most right) bit of a binary number or byte.
            <br> (e.g. The LSB of the binary number "100<span class="bold">0</span>" is "<span
                    class="bold">0</span>")
        </p>

        <h3>Where can I find more on the specification?</h3>
        <p><a href="https://www.midi.org" target="_blank">www.midi.org</a></p>
    </div>
</template>

<script>

    export default {
        name: 'home',
        created() {

        }
    }
</script>

<style>


</style>
