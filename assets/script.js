

// SYNTH
const synth = new Tone.MonoSynth().toDestination();
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

// ENVELOPE CONTROLS
const attackSlider = document.querySelector('#attack');
const decaySlider = document.querySelector('#decay');
const sustainSlider = document.querySelector('#sustain');
const releaseSlider = document.querySelector('#release');
attackSlider.addEventListener('input', function () {
    let attack = parseFloat(this.value);
    synth.envelope.attack = attack;
})
decaySlider.addEventListener('input', function () {
    let decay = parseFloat(this.value);
    synth.envelope.decay = decay;
})
sustainSlider.addEventListener('input', function () {
    let sustain = parseFloat(this.value);
    synth.envelope.sustain = sustain;
})
releaseSlider.addEventListener('input', function () {
    let release = parseFloat(this.value);
    synth.envelope.release = release;
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