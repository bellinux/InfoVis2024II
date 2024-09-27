const synth = new Tone.Synth().toDestination();
// synth.triggerAttackRelease("C4", "8n");


document.getElementById("boton-musica").addEventListener("click", () => {
    if (Tone.context.state !== "running") {
      Tone.start();
    }
    // synth.triggerAttackRelease("C4", "8n");
    synth.triggerAttackRelease("C5", "8n");
  });