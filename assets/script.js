

// SYNTH
const synth = new Tone.Synth().toDestination();
const osc2 = new Tone.Synth({detune: 12}).toDestination();
const osc3 = new Tone.Synth({detune: -12}).toDestination();

// KEYBOARD CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
    priority: 'last'
});
keyboard.down((key) => {
    synth.triggerAttack(key.frequency);
    osc2.triggerAttack(key.frequency);
    osc3.triggerAttack(key.frequency);
})

keyboard.up(() => {
    synth.triggerRelease();
    osc2.triggerRelease();
    osc3.triggerRelease();
})

// INIT AUDIO CONTEXT
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
})