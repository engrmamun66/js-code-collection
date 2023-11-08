// Create a class for the element
class MyCustomElement extends HTMLElement {
    static get observedAttributes(){
        return ["steps", "initialvalue"]
    }

    // Get And Set
    get steps(){
        return this.getAttribute('steps');
    }
    set steps(value){
        if(!value) this.removeAttribute('steps');
        else this.setAttribute('steps', value);
    }

    // Get And Set
    get initialvalue(){
        return this.getAttribute('initialvalue');
    }
    set initialvalue(value){
        if(!value) this.removeAttribute('initialvalue');
        else this.setAttribute('initialvalue', value);
    }   
    
  
    constructor() {
      // Always call super first in constructor
      super();
      console.log('constructor method');

      const shadow =  this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>
            button{padding:5px 10px}
        </style>
        <button id="decrement">-</button>
        <span style="width:20px" id="count">0</span>
        <button id="increment">+</button>
      `;
      this.countElement = shadow.querySelector('#count');
      this.decrementElement = shadow.querySelector('#decrement');
      this.incrementElement = shadow.querySelector('#increment');
     

    }

    /* -------------------------------------------------------------------------- */
    /*                               Lifecycle Hooks                              */
    /* -------------------------------------------------------------------------- */  
    connectedCallback() {
      console.log("Custom element added to page.");
      this.count = this.initialvalue || 123;
      this.countElement.innerHTML = this.count;
      this.decrementElement.addEventListener('click', this.decrementValue.bind(this))
      this.incrementElement.addEventListener('click', this.incrementValue.bind(this))
    }
  
    disconnectedCallback() {
      console.log("Custom element removed from page.");
      this.decrementElement.removeEventListener('click', this.decrementValue.bind(this))
      this.incrementElement.removeEventListener('click', this.incrementValue.bind(this))
    }
  
    adoptedCallback() {
      console.log("Custom element moved to new page.(mounted)");
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Attribute ${name} has changed.`);
    }
    /* --------------------------- End Lifecycle Hooks -------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                Calculations                                */
    /* -------------------------------------------------------------------------- */
    decrementValue(){
        this.count = +this.count - +this.steps      
        this.countElement.innerText = this.count
    }   
    
    incrementValue(){
        this.count = +this.count + +this.steps
        this.countElement.innerText = this.count     
        
        const incrementAttr = this.getAttribute('increment');
        if (incrementAttr) {
            console.log('here');
            new Function(incrementAttr)();
            const event = new CustomEvent('increment', { detail: {} });
            this.dispatchEvent(event);
        }
    }


  }
  
  customElements.define("life-cycle-methods", MyCustomElement);
  