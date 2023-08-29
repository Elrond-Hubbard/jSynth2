

// SYNTH
const synth = new Tone.Synth().toDestination();
console.log(synth)


// WAVEFORM SELECTOR
const waveformButtons = document.querySelectorAll('input[name="waveform"]')
waveformButtons.forEach(button =>
    button.addEventListener('input', function () {
        synth.oscillator.type = button.value;
    }
));

// UNISON CONTROLS
const countButtons = document.querySelectorAll('input[name="count"]')
countButtons.forEach(button =>
    button.addEventListener('input', function () {
        let count = parseInt(button.value)
        synth.oscillator.count = count;
    }))
const unisonSlider = document.querySelector('#spread')
unisonSlider.addEventListener('input', function () {
    let spread = parseInt(unisonSlider.value);
    synth.oscillator.spread = spread;
})


// KEYBOARD CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
    polyphony: 1,
    priority: 'last',
    octave: -2
});
console.log(keyboard)
keyboard.down((note) => {
    currentKeyDown = note.note;
    synth.triggerAttack(note.frequency);
});
keyboard.up((note) => {
    currentKeyUp = note.note;
    if (currentKeyUp === currentKeyDown) { synth.triggerRelease() };
});

// INIT AUDIO CONTEXT
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
});

// UTILITY FUNCTIONS
function setRadioValue(synthParameter) {
    synthParameter = button.value;
}