const playButton = document.getElementById("play-button");
const synth = new Tone.Synth().toDestination();

// 

console.log(Tone.context.state);

playButton.addEventListener("click", ()=>{
    if (Tone.context.state !== "running") {
        Tone.start();
        console.log(Tone.context.state); 
    }
    synth.triggerAttackRelease("C3", "8n");
})