/////////////////////////////////////////////////////////////////////////////////////////////////////
// SYNTH

const comp = new Tone.Compressor(-50, 3).toDestination();
const synth = new Tone.MonoSynth({
  oscillator: {
    type: "fatsawtooth",
    count: 1,
    spread: 25,
  },
  envelope: {
    attack: 0.005,
    decay: 0.5,
    sustain: 0.1,
    release: 1,
  },
  filter: {
    Q: 5,
  },
  filterEnvelope: {
    attack: 0.005,
    decay: 0.5,
    sustain: 0.1,
    release: 1,
    baseFrequency: 200,
  },
}).connect(comp);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// OSCILLATOR

// SHAPE BUTTONS
const waveformButtons = document.querySelectorAll('input[name="waveform"]');
waveformButtons.forEach((button) =>
  button.addEventListener("input", function () {
    synth.oscillator.type = button.value;
  })
);
// UNISON BUTTONS
const countButtons = document.querySelectorAll('input[name="count"]');
countButtons.forEach((button) =>
  button.addEventListener("input", function () {
    let count = parseInt(button.value);
    synth.oscillator.count = count;
  })
);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// SLIDER CONTROLS

function slider(element, object, property) {
  element.addEventListener("input", function () {
    let value = parseFloat(this.value);
    object[property] = value;
  });
}

// UNISON SLIDER
const unisonSlider = document.querySelector("#spread");
slider(unisonSlider, synth.oscillator, "spread");

// AMP ENVELOPE SLIDERS
const attackSlider = document.querySelector("#attack");
const decaySlider = document.querySelector("#decay");
const sustainSlider = document.querySelector("#sustain");
const releaseSlider = document.querySelector("#release");
slider(attackSlider, synth.envelope, "attack");
slider(decaySlider, synth.envelope, "decay");
slider(sustainSlider, synth.envelope, "sustain");
slider(releaseSlider, synth.envelope, "release");

// FILTER ENVELOPE SLIDERS
const filterAttackSlider = document.querySelector("#filter-attack");
const filterDecaySlider = document.querySelector("#filter-decay");
const filterSustainSlider = document.querySelector("#filter-sustain");
const filterReleaseSlider = document.querySelector("#filter-release");
slider(filterAttackSlider, synth.filterEnvelope, "attack");
slider(filterDecaySlider, synth.filterEnvelope, "decay");
slider(filterSustainSlider, synth.filterEnvelope, "sustain");
slider(filterReleaseSlider, synth.filterEnvelope, "release");

// FILTER CONTROLS
const cutoffSlider = document.querySelector("#cutoff");
const resonanceSlider = document.querySelector("#resonance");
slider(cutoffSlider, synth.filterEnvelope, "baseFrequency");
slider(resonanceSlider, synth.filter.Q, "value");

/////////////////////////////////////////////////////////////////////////////////////////////////////
// KEYBOARD CONTROLLER

const keyboard = new AudioKeys({
  rows: 2,
  polyphony: 1,
  priority: "last",
  octave: -2,
});
let currentKeyDown;
let currentKeyUp;
keyboard.down((note) => {
  currentKeyDown = note.note;
  synth.triggerAttack(note.frequency);
  // notes are recorded to sequencer if recorder is active
  if (recordingState === "true" && dynamicLoop.length < 16) {
    dynamicLoop.push(Tone.Frequency(note.frequency).toNote()); //freq converted to note
    sequenceLabel.innerText = dynamicLoop;
  }
});
keyboard.up((note) => {
  currentKeyUp = note.note;
  if (currentKeyUp === currentKeyDown) {
    synth.triggerRelease();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// TRANSPORT

Tone.Transport.loop = true;
Tone.Transport.loopStart = 0;
Tone.Transport.loopEnd = "1m";
var beat = 1;
Tone.Transport.scheduleRepeat(
  (time) => {
    console.log(`${beat}!`);
    if (beat >= 16) {
      beat = 1;
      sequence.events = dynamicLoop;
    } else {
      beat++;
    }
  },
  "16n",
  0
);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// LOOPS

var dynamicLoop = [];
// example loops
const loop1 = [
  "A1",
  "A1",
  "A1",
  "A2",
  "A1",
  "A1",
  "A1",
  "A2",
  "A1",
  "A1",
  "A1",
  "A2",
  "A1",
  "A1",
  "C2",
  "C2",
];
const loop2 = [
  "G1",
  "A2",
  "B2",
  "C2",
  "G1",
  "A2",
  "B2",
  "C2",
  "G1",
  "A2",
  "B2",
  "C2",
  "G1",
  "A2",
  "G2",
  "G2",
];
function loopHandler(element, loop) {
  element.addEventListener("click", () => {
    dynamicLoop = loop;
    sequenceLabel.innerText = dynamicLoop;
  });
}
const loop1Button = document.getElementById("loop1-button");
const loop2Button = document.getElementById("loop2-button");
loopHandler(loop1Button, loop1);
loopHandler(loop2Button, loop2);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// SEQUENCER

const sequenceLabel = document.getElementById("sequence-label");
const sequence = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, "16n", time);
  },
  dynamicLoop,
  "16n"
);

// PLAY BUTTON
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
  playButton.style.backgroundColor = "green";
  playButton.style.color = "white";
  sequence.events = dynamicLoop;
  sequence.start(0);
  // kickSequence.start(0)
  // snareSequence.start(0)
  Tone.Transport.start(0);
  beat = 1;
});
// STOP BUTTON
const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", () => {
  playButton.style.backgroundColor = "";
  playButton.style.color = "";
  sequence.stop(0);
  // kickSequence.stop(0)
  // snareSequence.stop(0)
  Tone.Transport.stop(0);
});
// CLEAR BUTTON
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {
  dynamicLoop = [];
  sequenceLabel.innerText = dynamicLoop;
});
// RECORD BUTTON
const recordButton = document.getElementById("record-button");
let recordingState = recordButton.dataset.recording;
recordButton.addEventListener("click", () => {
  if (recordingState === "false") {
    recordingState = "true";
    recordButton.style.backgroundColor = "red";
    recordButton.style.color = "white";
  } else {
    recordButton.style.backgroundColor = "";
    recordButton.style.color = "";
    recordingState = "false";
  }
});
// BPM FORM
const bpmForm = document.getElementById("bpm-form");
Tone.Transport.bpm.value = bpmForm.value;
bpmForm.addEventListener("input", () => {
  Tone.Transport.bpm.value = bpmForm.value;
  if (bpmForm.value < 1) {
    bpmForm.value = 1;
  } else if (bpmForm.value > 200) {
    bpmForm.value = 200;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// OSCILLOSCOPE
const canvas = document.getElementById("canvas");
const canvasWidth = canvas.offsetWidth;
const ctx = canvas.getContext("2d");

const toneAnalyser = new Tone.Analyser({ size: 2048, type: "waveform" });
comp.connect(toneAnalyser);

function draw() {
  requestAnimationFrame(draw);
  const oscBuffer = toneAnalyser.size;
  const oscArray = toneAnalyser.getValue();

  ctx.fillRect(0, 0, canvasWidth, 100);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(50, 255, 0)";
  ctx.beginPath();

  const sliceWidth = canvasWidth / oscBuffer;
  let x = 0;

  for (i = 0; i < oscBuffer; i++) {
    const v = oscArray[i] / 16.0;
    const y = v * 400;
    if (i === 0) {
      ctx.moveTo(x / 2 - 3, y);
    } else {
      ctx.lineTo(x - 3, y + 50);
    }
    x += sliceWidth;
  }

  ctx.lineTo(canvasWidth, 200 / 2);
  ctx.stroke();
}
draw();

/////////////////////////////////////////////////////////////////////////////////////////////////////

// const kick = new Tone.MembraneSynth().connect(comp)
// const snare = new Tone.NoiseSynth().connect(comp)
// const kickSequence = new Tone.Sequence((time, note) => {
//     kick.triggerAttackRelease(note, "4n", time)
//     }, ["C2", "C2", "C2", "C2"], "4n");
// const snareSequence = new Tone.Sequence((time, ) => {
//     snare.triggerAttackRelease("4n", time)
//     }, [null, "C2", null, "C2"], "4n");
