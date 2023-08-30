

// SYNTH
const comp = new Tone.Compressor(-50, 3).toDestination();
const synth = new Tone.MonoSynth().connect(comp);


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
    synth.filterEnvelope.attack = attack;
})
decaySlider.addEventListener('input', function () {
    let decay = parseFloat(this.value);
    synth.envelope.decay = decay;
    synth.filterEnvelope.decay = decay;
})
sustainSlider.addEventListener('input', function () {
    let sustain = parseFloat(this.value);
    synth.envelope.sustain = sustain;
    synth.filterEnvelope.sustain = sustain;
})
releaseSlider.addEventListener('input', function () {
    let release = parseFloat(this.value);
    synth.envelope.release = release;
    synth.filterEnvelope.release = release;
})

function setSliderValue(val, envelopeParam, filterParam) {
    let (val) = parseFloat(this.value);
    (envelopeParam) = val;
    (filterParam) = val;

}

// FILTER CONTROLS
cutoffSlider = document.querySelector('#cutoff')
resonanceSlider = document.querySelector('#resonance')
cutoffSlider.addEventListener('input', function() {
    let cutoff = parseFloat(this.value);
    synth.filterEnvelope.baseFrequency = cutoff;
})
resonanceSlider.addEventListener('input', function() {
    let resonance = parseFloat(this.value);
    synth.filter.Q.value = resonance;
})


// KEYBOARD CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
    polyphony: 1,
    priority: 'last',
    octave: -2
});
keyboard.down((note) => {
    currentKeyDown = note.note;
    synth.triggerAttack(note.frequency);
    // notes are recorded to sequencer if recorder is active
    if (recordingState==='true' && dynamicLoop.length<16) {
        dynamicLoop.push(Tone.Frequency(note.frequency).toNote())
    console.log(dynamicLoop)
    sequenceLabel.innerText = dynamicLoop;
    }
});
keyboard.up((note) => {
    currentKeyUp = note.note;
    if (currentKeyUp === currentKeyDown) { synth.triggerRelease() };
});

// LOOPS
// hardcoded loop
const shredBass = [
    "A2", "A2", "C2", "D2",
    "A1", "A1", "C2", "D2",
    "A1", "A1", "C2", "D2",
    "A1", "A1", "C2", "D2",
    "G2", "G2", "B1", "C2",
    "G1", "G1", "B1", "C2",
    "G1", "G1", "B1", "C2",
    "G1", "G1", "B1", "C2",
];
// dynamic loop
var dynamicLoop = [];


// SEQUENCER
const sequenceLabel = document.getElementById("sequence-label")

// PLAY BUTTON
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', () => {
    sequence = new Tone.Sequence((time, note) => {
        console.log(note, time);
        synth.triggerAttackRelease(note, "16n", time)
    }, dynamicLoop, "16n").start(0);
    Tone.Transport.start();
});

// STOP BUTTON
const stopButton = document.getElementById("stop-button");
stopButton.addEventListener('click', () => {
    sequence.stop(0)
    Tone.Transport.stop(0)
})

// CLEAR BUTTON
const clearButton = document.getElementById("clear-button")
clearButton.addEventListener('click', () => {
    dynamicLoop = [];
    sequenceLabel.innerText = dynamicLoop;
})

// RECORD BUTTON
const recordButton = document.getElementById("record-button")
recordingState = recordButton.dataset.recording;
console.log(recordingState)
recordButton.addEventListener('click', () => {
    if (recordingState === 'false') {
        recordingState = 'true';
        recordButton.style.backgroundColor = "red"
    } else {
        recordButton.style.backgroundColor = ""
        recordingState = 'false';
    }
})