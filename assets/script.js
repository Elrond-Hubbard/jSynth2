
// ELEMENT ASSIGNMENTS
const playButton = document.getElementById("play-button");

// CREATE SYNTH
const synth = new Tone.Synth().toDestination();

// CREATE CONTROLLER
const keyboard = new AudioKeys({
    rows: 2,
});

keyboard.down((key) => {
    console.log(key);
    synth.triggerAttackRelease(key.frequency, "8n")
})

playButton.addEventListener("click", () => {
    if (Tone.context.state !== "running") {
        Tone.start();
    }
})