function createComponentHTML(DomElement, options, modifyInDom=true) {    
    // options = [
    //     {
    //         selector: 'p', // space not supported
    //         template: true,
    //         attr: {
    //             'v-if': 'person.idd == 0'
    //         },
    //         text: "{{ 'Administrator' }}",
    //         removeSiblings: false,
    //         classToRemove: '',
    //     },
    // ]
    element = modifyInDom ? DomElement : DomElement.cloneNode(true);
    try {
        let templates = [];
        options?.forEach((option, index) => {
            let el = element;
            if(index > 0 || option?.selector){
      
                el = element?.querySelector(option?.selector) || element?.content?.querySelector(option?.selector);
                
                // Finding from all templates
                templates.forEach(template => {
                    let _el = template.content.querySelectorAll(option.selector);
                    if(_el?.length){
                        if(_el) el = _el[_el.length - 1];   
                    }
                })  
            }             
                   
            if (el && option.attr) {
                if (option.template) {
                    if(option.removeSiblings){
                        while(el.nextSibling){
                            el.nextSibling.remove()
                        }
                    }
                    let template                    

                    template = document.createElement('template');
                    if('v-else-if' in option.attr || 'v-else' in option.attr){ 
                        let last_template = templates[templates.length  - 1]  
                        let clonedEl = el.cloneNode(true);
                        clearVueAttributes(clonedEl);                
                        template.content.appendChild(clonedEl);
                        last_template.insertAdjacentElement('afterend', template);                        
                    }else{
                        template.content.appendChild(el.cloneNode(true));
                        el.insertAdjacentElement('beforebegin', template);
                        el.remove();
                    }
                    templates.push(template);
                    el = template;          
                    
                    Object.entries(option.attr).forEach(entry => {
                        let [key, value] = entry;
                        key = key.replace(/^@/, "v-on:");
                        el.setAttribute(key, key=='v-else' ? '' : value);
                        if(option.classToRemove){
                            el.classList.remove(option.classToRemove)
                        }                        
                    })
                } else {

                    if('v-else-if' in option.attr || 'v-else' in option.attr){
                        let clonedEl = el.cloneNode(true)
                        clearVueAttributes(clonedEl)
                        el.insertAdjacentElement("afterend", clonedEl);
                        el = clonedEl;
                    }

                    Object.entries(option.attr).forEach(entry => {
                        let [key, value] = entry;
                        key = key.replace(/^@/, "v-on:");
                        el.setAttribute(key, key=='v-else' ? '' : value);
                        if(option.classToRemove){
                            el.classList.remove(option.classToRemove)
                        }
                        if(option.removeSiblings){
                            while(el.nextSibling){
                                el.nextSibling.remove()
                            }
                        }
                    })

                    if(option.removeSiblings){
                        while(el.nextSibling){
                            el.nextSibling.remove()
                        }
                    }
                }
            }

            if (el && option.text) {
                let innerHTML = null;
                if(el.content) el = el.content.firstChild; 
                innerHTML = el.innerHTML;
                innerHTML = el.innerHTML?.replace(/\s{2,}/g, "");

                let pre_icon_html = '';
                let post_icon_html = ''
                if (el.querySelector('i')) {
                    let hasIconInLeft = (/i>.*[a-z]+/i).test(innerHTML);
                    let hasIconInRight = (/[a-z]+\s?<i/i).test(innerHTML);
                    if (hasIconInLeft) pre_icon_html = el.querySelector('i').outerHTML;
                    if (hasIconInRight) post_icon_html = el.querySelector('i').outerHTML;
                }   

                if(el.content){
                    el.innerHTML =  `${pre_icon_html} ${option.text} ${post_icon_html}`;
                } else {
                    el.innerHTML = `${pre_icon_html} ${option.text} ${post_icon_html}`;
                }
            }
        });        
        return element.outerHTML;
    } catch (error) {
        console.warn(error);
    }
}



function clearVueAttributes(domElement) {
    if (domElement && domElement.attributes) {
      for(let i=domElement.attributes.length-1; i >= 0; i--) {
        let attributeName = domElement.attributes[i].name
        var htmlAttributes = [
            'class', 'id', 'title', 'disabled', 'hidden', 'contenteditable',
            'name', 'value', 'placeholder', 'type', 'href', 'src', 'alt',
            'style', 'target', 'rel', 'width', 'height', 'maxlength', 'min',
            'max', 'step', 'for', 'tabindex', 'readonly', 'required', 'autofocus',
            'aria-label', 'role', 'aria-hidden', 'aria-disabled', 'aria-selected',
            'aria-checked', 'aria-describedby', 'aria-labelledby', 'aria-controls'
            // Add more attributes here as needed
        ];
        if(!htmlAttributes.includes(attributeName)){
            domElement.removeAttribute(attributeName);
        }
      }
    }
}