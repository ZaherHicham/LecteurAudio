class StereoControl extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const panSlider = this.shadowRoot.querySelector("#stereo");

        // Demander le contexte audio et le panNode au composant parent
        const event = new CustomEvent("setAudioContext", {
        detail: { context: null, panNode: null },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);

      const panNode = event.detail.panNode;

      if (panNode) {
        // Mettre à jour la valeur de pan en fonction du slider
        panSlider.addEventListener("input", () => {
          panNode.pan.value = panSlider.value;
        });
      }

        // this.stereoInput = this.shadowRoot.getElementById("stereo");
        // this.stereoInput.addEventListener("input", (event) => {
        //     // Émet un événement pour informer ControlsBar de la nouvelle valeur
        //     this.dispatchEvent(new CustomEvent('stereo-changed', {
        //         detail: { value: event.target.value },
        //         bubbles: true,
        //         composed: true
        //     }));
        // });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the stereo controls */
            </style>
            <label>Stéréo:</label>
            <input type="range" id="stereo" min="-1" max="1" step="0.01" value="0"> <!-- Contrôle stéréo -->

        `;
    }
}

customElements.define('stereo-control', StereoControl);