customElements.define('slot-example',
    class SlotExample extends HTMLElement{
        constructor(){
            super();
            const template = document.createElement('template');
            template.innerHTML = `
                <style>
                h1{
                    color:blue;
                }
                ::slotted([slot=footer]){
                    color:blue !important;
                }
                </style>
                <div>
                    <header>
                        <slot name="header">Fallback content</slot>
                    </header>
                    <h1>THis is default header</h1>
                    <slot></slot>
                    <footer>
                        <slot name="footer">Fallback content</slot>
                    </footer>
                </div>
            `;
            this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }
)       