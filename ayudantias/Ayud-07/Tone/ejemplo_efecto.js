// const synth = new Tone.Synth();
// const feedbackDelay = new Tone.FeedbackDelay();
// synth.connect(feedbackDelay);
// feedbackDelay.toDestination();
// document.getElementById("boton-musica").addEventListener("click", () => {
//     if (Tone.context.state !== "running") {
//       Tone.start();
//     }
//     synth.triggerAttackRelease("C4", "8n");
//   });



// const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
//   const tom = new Tone.MembraneSynth({
//       octaves: 4,
//       pitchDecay: 0.1
//   }).connect(feedbackDelay);
// document.getElementById("boton-musica").addEventListener("click", () => {
//     if (Tone.context.state !== "running") {
//       Tone.start();
//     }
//     tom.triggerAttackRelease("A2", "32n");
//   });


const player = new Tone.Player({
	url: "beethoven.mp3",
	loop: true,
	autostart: true,
});

const distortion = new Tone.Distortion(0.4).toDestination();
const filter = new Tone.Filter(400, "lowpass").toDestination();

player.connect(distortion);
player.connect(filter);

document.getElementById("boton-musica").addEventListener("click", () => {
    if (Tone.context.state !== "running") {
        Tone.start().then(() => {
            player.start();  
        });
    }
    player.start();  
    
});
