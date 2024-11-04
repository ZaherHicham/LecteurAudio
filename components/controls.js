class ControlsBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
     this.audioElement = this.shadowRoot.getElementById("audio");

    // Demander le contexte audio et le panNode au composant parent
    const event = new CustomEvent("setAudioContext", {
      detail: { context: null, panNode: null },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);

    const context = event.detail.context;
    const panNode = event.detail.panNode;

    if (context && panNode) {
      // Crée un nœud de source pour l'élément audio
      const source = context.createMediaElementSource(this.audioElement);
      source.connect(panNode).connect(context.destination);
    }

    // this.audioElement.addEventListener("loadeddata", () => {
    //     this.dispatchEvent(new CustomEvent('audio-element-ready', {
    //         detail: { audioElement: this.audioElement },
    //         bubbles: true,
    //         composed: true
    //     }));
    // });

    this.audioElement.addEventListener("play", () => {
        if (context.state === "suspended") {
            context.resume();
          }
      console.log("Lecture commencée");
      this.audioElement.play();
    });

    this.audioElement.addEventListener("pause", () => {
      console.log("Lecture en pause");
      this.audioElement.pause();
    });

    this.volumeInput = this.shadowRoot.getElementById("volume");
    this.volumeInput.addEventListener("input", (event) => {
      this.audioElement.volume = event.target.value; // Met à jour le volume de l'élément audio
    });

    this.shadowRoot.getElementById("rewind").addEventListener("click", () => {
      this.audioElement.currentTime -= 5; // recule de 5 secondes
    });
    this.shadowRoot
      .getElementById("fastforward")
      .addEventListener("click", () => {
        this.audioElement.currentTime += 5; // avance de 5 secondes
      });

    // Écouteur d'événements pour le contrôle stéréo
    //   this.shadowRoot.getElementById("stereo-control").addEventListener("stereo-changed", (event) => {
    //     // Émettre un événement pour faire savoir à AudioPlayer que le stéréo a changé
    //     this.dispatchEvent(new CustomEvent('stereo-changed', {
    //         detail: { value: event.detail.value },
    //         bubbles: true,
    //         composed: true
    //     }));
    // });
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the controls bar */
            </style>
            <audio id="audio" src="./components/music/track-01.mp3" controls>
                Your browser does not support the audio element.
            </audio>
            <label>Volume:</label>
            <input type="range" id="volume" min="0" max="1" step="0.01" value="1">

            <button id="rewind">Rewind</button>
            <button id="fastforward">Fast Forward</button>

            <stereo-control id="stereo-control"></stereo-control> <!-- Assurez-vous que le composant est là -->
        
 
        `;
  }
}

customElements.define("controls-bar", ControlsBar);
