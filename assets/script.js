

// SYNTH
const synth = new Tone.Synth().toDestination();
const {envelope, oscillator} = synth;
const {attack, decay, sustain, release} = envelope;
const {count, spread, type} = oscillator;

// KEYBOARD CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
    priority: 'last'
});
keyboard.down((key) => {
    synth.triggerAttack(key.frequency);
})
keyboard.up(() => {
    synth.triggerRelease();
})

// INIT AUDIO CONTEXT
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
})