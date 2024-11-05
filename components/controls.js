class ControlsBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.context = null;
    this.panNode = null;
    this.analyser = null;
    this.source = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.audioElement = this.shadowRoot.getElementById("audio");

    this.audioElement.addEventListener("loadeddata", () => {
      console.log(
        "Élément audio prêt, envoi de l'événement 'audio-element-ready'"
      );

      if (!this.context) {
        this.context = new AudioContext();
        this.panNode = new StereoPannerNode(this.context, { pan: 0 });
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 256;

        this.source = this.context.createMediaElementSource(this.audioElement);
        this.source.connect(this.panNode);
        this.panNode.connect(this.context.destination);
        this.source.connect(this.analyser);

        console.log("AudioContext et nœuds audio avec stéréo initialisés.");
      }
      // Émettre l'événement 'audio-element-ready' avec l'élément audio dans 'detail'
      this.dispatchEvent(
        new CustomEvent("audio-element-ready", {
          detail: { analyser: this.analyser },
          bubbles: true,
          composed: true,
        })
      );
    });

    this.audioElement.addEventListener("play", () => {
      if (this.context.state === "suspended") {
        this.context.resume().then(() => {
          console.log("AudioContext repris après action utilisateur.");
        });
      }
    });

    // Écoute le changement de panoramique du composant stereo-control
    const stereoControl = this.shadowRoot.getElementById("stereo-control");
    stereoControl.addEventListener("pan-change", (event) => {
      const panValue = event.detail.value;
      if (this.panNode && !isNaN(panValue)) {
        this.panNode.pan.value = panValue;
        // console.log("Valeur de panoramique mise à jour:", this.panNode.pan.value);
      } // else {
      //     console.error("Valeur de panoramique non valide:", panValue);
      // }
    });

    //knob-control
    const volumeKnob = this.shadowRoot.getElementById("volume-knob");

    // Connectez le changement de valeur du knob au volume de l'audio
    volumeKnob.addEventListener("input", (event) => {
      this.audioElement.volume = event.target.value / 100; // Normaliser de 0 à 1
    });

    // this.volumeInput = this.shadowRoot.getElementById("volume");
    // this.volumeInput.addEventListener("input", (event) => {
    //   this.audioElement.volume = event.target.value;
    // });

    this.shadowRoot.getElementById("rewind").addEventListener("click", () => {
      this.audioElement.currentTime -= 5;
    });
    this.shadowRoot
      .getElementById("fastforward")
      .addEventListener("click", () => {
        this.audioElement.currentTime += 5;
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <script src="./components/webaudio-controls.js"></script>

          <style>
              /* Styles for the controls bar */
          </style>
          <audio id="audio" src="./components/music/track-01.mp3" controls>
              Your browser does not support the audio element.
          </audio>
          <!-- <label>Volume:</label>
          <input type="range" id="volume" min="0" max="1" step="0.01" value="1"> -->
          <button id="rewind">Rewind</button>
          <button id="fastforward">Fast Forward</button>
          <stereo-control id="stereo-control"></stereo-control>
          <label>Volume:</label>
          <webaudio-knob id="volume-knob"
               src="/assets/images/Amp_Knob.png"
               min="0" max="100" value="50"
               step="1"
               sprites="100"
               diameter="64"
               tooltip="Volume: %d">
          </webaudio-knob>
          `;
    // <div class="control-panel">
    //       <knob-control id="volume-knob" sprite="/assets/images/Amp_Knob.png" steps="100" min="0" max="100"></knob-control>
    // </div>
  }
}

customElements.define("controls-bar", ControlsBar);
