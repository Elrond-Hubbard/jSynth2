

// SYNTH
const synth = new Tone.Synth().toDestination();

// WAVEFORM SELECTOR
waveforms = document.querySelectorAll('input[name="waveform"]')
waveforms.forEach(waveform =>
    waveform.addEventListener('input', function () {
        synth.oscillator.type = waveform.value;
    }
));

// KEYBOARD CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
    priority: 'last'
});
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