const sampler = new Tone.Sampler({
    urls: {
        C4: "beethoven.mp3",  // Archivo de sonido
    },
    release: 1,
    baseUrl: "./",  // Asegura que busque el archivo en la misma carpeta
}).toDestination();

// Evento de clic para el botón
document.getElementById("boton-musica").addEventListener("click", () => {
    // Verifica si el contexto de audio no está activo
    if (Tone.context.state !== "running") {
        Tone.start().then(() => {
            sampler.triggerAttackRelease("C4", 10);
        });
    } 
    sampler.triggerAttackRelease("C4", 10);
    
});



