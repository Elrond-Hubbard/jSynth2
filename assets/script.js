
// ELEMENT ASSIGNMENTS
const playButton = document.getElementById("play-button");

// CREATE SYNTH
const synth = new Tone.Synth().toDestination();
const osc2 = new Tone.Synth({detune: 12}).toDestination();
const osc3 = new Tone.Synth({detune: -12}).toDestination();


// CREATE CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
});

keyboard.down((key) => {
    synth.triggerAttackRelease(key.frequency, "4n");
    osc2.triggerAttackRelease(key.frequency, "4n");
    osc3.triggerAttackRelease(key.frequency, "4n");
})

playButton.addEventListener("click", () => {
    if (Tone.context.state !== "running") {
        Tone.start();
    }
})