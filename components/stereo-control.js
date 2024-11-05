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
        const panSlider = this.shadowRoot.querySelector("#stereo-slider");

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
            <webaudio-slider id="stereo-slider"
                         src="/assets/images/Yal-SliderV.png"  
                         min="-1" max="1" value="0"           
                         step="0.01"                          
                         sprites="30"                        
                         width="32" height="128"             
                         tooltip="Stéréo: %d">
        </webaudio-slider>
        `;
    }
}

customElements.define('stereo-control', StereoControl);
