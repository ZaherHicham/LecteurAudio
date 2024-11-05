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
    // const stereoSlider = this.shadowRoot.getElementById("stereo-slider");

    //         // Ajustement du panoramique stéréo
    //         stereoSlider.addEventListener("input", (event) => {
    //             this.panNode.pan.value = parseFloat(event.target.value);
    //             console.log("Valeur de panoramique:", panNode.pan.value);
    //         });
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
    


    //knob-control VOLUME
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
        /* Styles généraux pour le conteneur des contrôles */
        .control-panel {
            background-color: #3a3a3a;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            max-width: 300px;
            text-align: center;
            color: #ffffff;
            font-family: Arial, sans-serif;
            width: 500px;
        }
    
        /* Style pour l'élément audio */
        #audio {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 20px;
        }
    
        /* Style pour les boutons de contrôle */
        #rewind, #fastforward {
            background-color: #555;
            border: none;
            color: #ffffff;
            padding: 8px 12px;
            margin: 5px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 45%;
        }
    
        #rewind:hover, #fastforward:hover {
            background-color: #777;
        }
    
        /* Alignement des labels et contrôles */
        .control-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
        }
    
        /* Style pour le volume knob */
        #volume-knob {
            display: inline-block;
            margin: 10px;
            width: 64px;
            height: 64px;
        }
    
        /* Style pour le stéréo control */
        #stereo-control {
            margin: 10px auto;
            display: block;
            width: 100%; /* Ajustez selon les besoins */
        }
    
        /* Label styling */
        label {
            font-size: 14px;
            margin-right: 10px;
        }
    </style>
    
    <div class="control-panel">
        <!-- Élément audio avec contrôles -->
        <audio id="audio" src="./components/music/track-01.mp3" controls>
            Your browser does not support the audio element.
        </audio>
    
        <!-- Boutons de Rewind et Fast Forward -->
        <div class="control-group">
            <button id="rewind">Rewind</button>
            <button id="fastforward">Fast Forward</button>
        </div>
    
        <!-- Contrôle de Volume avec WebAudioKnob -->
        <div class="control-group">
            <label for="volume-knob">Volume:</label>
            <webaudio-knob id="volume-knob"
                           src="/assets/images/Amp_Knob.png"
                           min="0" max="100" value="100"
                           step="1"
                           sprites="100"
                           diameter="64"
                           tooltip="Volume: %d">
            </webaudio-knob>
        </div>
    
        <!-- Contrôle de Stéréo -->
        <div class="control-group">
            <stereo-control id="stereo-control"></stereo-control>
        </div>
    </div>
    
          `;
  }
}

customElements.define("controls-bar", ControlsBar);
