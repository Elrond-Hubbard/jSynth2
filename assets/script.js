

// SYNTH
const comp = new Tone.Compressor(-50, 3).toDestination();
const synth = new Tone.MonoSynth({
    oscillator: {
        type: "fatsawtooth",
        count: 1,
        spread: 25
    },
    envelope: {
        attack: 0.005,
        decay: 0.5,
        sustain: 0.1,
        release: 1
    },
    filter: {
        Q: 5
    },
    filterEnvelope: {
        attack: 0.005,
        decay: 0.5,
        sustain: 0.1,
        release: 1,
        baseFrequency: 200
    }
}).connect(comp);


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

const filterAttackSlider = document.querySelector('#filter-attack');
const filterDecaySlider = document.querySelector('#filter-decay');
const filterSustainSlider = document.querySelector('#filter-sustain');
const filterReleaseSlider = document.querySelector('#filter-release');

// AMP ENVELOPE
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

// FILTER ENVELOPE
filterAttackSlider.addEventListener('input', function () {
    let attack = parseFloat(this.value);
    synth.filterEnvelope.attack = attack;
})
filterDecaySlider.addEventListener('input', function () {
    let decay = parseFloat(this.value);
    synth.filterEnvelope.decay = decay;
})
filterSustainSlider.addEventListener('input', function () {
    let sustain = parseFloat(this.value);
    synth.filterEnvelope.sustain = sustain;
})
filterReleaseSlider.addEventListener('input', function () {
    let release = parseFloat(this.value);
    synth.filterEnvelope.release = release;
})



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
        dynamicLoop.push(Tone.Frequency(note.frequency).toNote())//freq converted to note
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
        synth.triggerAttackRelease(note, "16n", time)
        }, dynamicLoop, "16n").start(0);
    playButton.style.backgroundColor = "green"
    playButton.style.color = "white"
    Tone.Transport.start();
});
// STOP BUTTON
const stopButton = document.getElementById("stop-button");
stopButton.addEventListener('click', () => {
    playButton.style.backgroundColor = ""
    playButton.style.color = ""
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
let recordingState = recordButton.dataset.recording;
recordButton.addEventListener('click', () => {
    if (recordingState === 'false') {
        recordingState = 'true';
        recordButton.style.backgroundColor = "red"
        recordButton.style.color = "white"
    } else {
        recordButton.style.backgroundColor = ""
        recordButton.style.color = ""
        recordingState = 'false';
    }
})
// BPM FORM
const bpmForm = document.getElementById("bpm-form")
Tone.Transport.bpm.value = bpmForm.value;
bpmForm.addEventListener('input', () => {
    Tone.Transport.bpm.value = bpmForm.value;
    if (bpmForm.value < 1) {
        bpmForm.value = 1;
    } else if (bpmForm.value > 200) {
        bpmForm.value = 200;
    }
})


// OSCILLOSCOPE
const canvas = document.getElementById("canvas");
const canvasWidth = canvas.offsetWidth;
const ctx = canvas.getContext("2d");

const toneAnalyser = new Tone.Analyser({size: 2048, type: "waveform"});
synth.connect(toneAnalyser)

function draw() {
    const drawVisual = requestAnimationFrame(draw)
    const oscBuffer = toneAnalyser.size
    const oscArray = toneAnalyser.getValue()

    ctx.fillRect(0, 0, canvasWidth, 100);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(50, 255, 0)"
    ctx.beginPath();

    const sliceWidth = canvasWidth / oscBuffer;
    let x = 0;

    for (i = 0; i < oscBuffer; i++) {
        const v = oscArray[i] / 16.0;
        const y = v * (200);
        if (i === 0) {
            ctx.moveTo(x/2-3, y);
        } else {
            ctx.lineTo(x-3, y+50);
        }
        x += sliceWidth;
    }

    ctx.lineTo(canvasWidth, 200/2);
    ctx.stroke();
}
draw()
