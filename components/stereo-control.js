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

        panSlider.addEventListener("input", (event) => {
            const panValue = parseFloat(event.target.value); // Assurez-vous que la valeur est un nombre
            this.dispatchEvent(new CustomEvent("pan-change", {
                detail: { value: panValue },
                bubbles: true,
                composed: true
            }));
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the stereo controls */
            </style>
            <label>Stéréo:</label>
            <input type="range" id="stereo" min="-1" max="1" step="0.01" value="0">
        `;
    }
}

customElements.define('stereo-control', StereoControl);
