function createComponentHTML(DomElement, options, modifyInDom=true) {    
    // options = [
    //     {
    //         selector: 'p',
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
        options?.forEach((option, index) => {
            let el = element;
            if(index > 0 || option?.selector){
                el = element?.querySelector(option?.selector) || element?.content?.querySelector(option?.selector);
            }           
           
            if (el && option.attr) {
                if (option.template) {
                    let template = document.createElement('template');
                    template.content.appendChild(el.cloneNode(true));
                    el.insertAdjacentElement('beforebegin', template);

                    if(index==0) {
                        element = template
                    }            
                    
                    el = template;                       
                    Object.entries(option.attr).forEach(entry => {
                        let [key, value] = entry;
                        el.setAttribute(key, value);
                        if(option.classToRemove){
                            el.classList.remove(option.classToRemove)
                        }
                        if(option.removeSiblings){
                            while(el.nextSibling){
                                el.nextSibling.remove()
                            }
                        }
                    })
                } else {
                    Object.entries(option.attr).forEach(entry => {
                        let [key, value] = entry;
                        el.setAttribute(key, value);
                        if(option.classToRemove){
                            el.classList.remove(option.classToRemove)
                        }
                        if(option.removeSiblings){
                            while(el.nextSibling){
                                el.nextSibling.remove()
                            }
                        }
                    })
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