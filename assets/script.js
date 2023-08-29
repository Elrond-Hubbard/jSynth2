

// SYNTH
const synth = new Tone.Synth().toDestination();

// WAVEFORM SELECTOR
waveforms = document.querySelectorAll('input[name="waveform"]')
waveforms.forEach(waveform =>
    waveform.addEventListener('input', function () {
        synth.oscillator.type = waveform.value;
    }
));

// UNISON CONTROLS
unisonSlider = document.querySelector('#spread')
unisonSlider.addEventListener('input', function () {
    spread = parseInt(unisonSlider.value);
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