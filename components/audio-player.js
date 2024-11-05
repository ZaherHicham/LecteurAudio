class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.context = new AudioContext();
    this.panNode = new StereoPannerNode(this.context, { pan: 0 });

    // Passer audioContext et panNode aux enfants
    this.addEventListener("setAudioContext", (event) => {
      event.detail.context = this.context;
      event.detail.panNode = this.panNode;
    });
  }

  connectedCallback() {
    this.render();
    this.controls = this.shadowRoot.querySelector("controls-bar");
    this.playlist = this.shadowRoot.querySelector("playlist-bar");
    this.progressBar = this.shadowRoot.querySelector("progress-bar");
    this.stereoControl = this.shadowRoot.querySelector("stereo-control");
    this.visualizer = this.shadowRoot.querySelector("audio-visualizer");
    
    

    // Configurez le visualiseur avec le contexte et l'élément audio
    this.controls.addEventListener("audio-element-ready", (event) => {
      this.visualizer.setupVisualizer(event.detail.analyser);
        
    });


    // // Écouteur pour récupérer l'élément audio
    // this.controls.addEventListener("stereo-changed", (event) => {
    //   this.setupAudio(event.detail.audioElement);
    // });

    // // Écouteur d'événements pour le contrôle stéréo
    // this.controls.addEventListener("stereo-changed", (event) => {
    //   console.log("Changement de stéréo:", event.detail.value); // Pour déboguer
    //   this.panner.pan.value = parseFloat(event.detail.value); // Ajuste la position stéréo
    // });
  }

//   setupAudio(audioElement) {
//     // Connexion de l'élément audio au panner
//     const source = this.context.createMediaElementSource(audioElement);
//     source.connect(this.panner); // Connecte l'élément audio au panner
//     this.panner.connect(this.context.destination); // Connecte le panner à la destination audio
//   }



  render() {
    this.shadowRoot.innerHTML = `
            <style>
                /* Ajoute ici tes styles si nécessaire */

                .main-container {
                  display: flex;
                  align-items: flex-start; /* Aligne les deux éléments en haut */
                  max-width: 100%;
                  overflow-x: auto; /* Ajoute une barre de défilement horizontale si nécessaire */
                  
                }
            </style>
            <div class="main-container">
              <controls-bar></controls-bar>
              <playlist-bar></playlist-bar>
              <progress-bar></progress-bar>
              <audio-visualizer></audio-visualizer>
            </div>
        `;
  }
}

customElements.define("audio-player", AudioPlayer);
