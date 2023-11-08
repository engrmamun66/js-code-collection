customElements.define('hello-world',
    class HelloWord extends HTMLElement {
        static observedAttributes = ["cc"];
        
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.innerHTML = `
            <div>
                <p>This is a paragraph</p>
                <h1>My name is ${this.getAttribute('cc')}</h1>
            </div>`
        }

        connectedCallback() {
            // Mounted
            console.log('Mounted');
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.connectedCallback()     
        }
    }
    
)