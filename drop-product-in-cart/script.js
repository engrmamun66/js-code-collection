
function dropToCart(add_to_cart_event, {
    product_selector='.product', // selector | HTMLElement
    target_selector='img', // selector | '__SELF__'
    cart_selector='#cart',
    animation_time=1.5, // in secode
    target_opacity=0.5,
    target_width=20, // in pixel
    target_height=20, // in pixel
    target_adjust_left=0, // in pixel
    target_adjust_top=0, // in pixel
    target_style='',
    target_class='dropping-to-cart',
    quantity=1,
    clone_gap=-20, // For Multiple Qty
    step_time=500, // For Multiple Qty
    cart_animation_class='random', // horizontal-shake | vertical-shake | rise-shake | random
    cart_animation_time=0.7, // in second
    after_add_click_on_cart=false,
}={}){

    let response = {
        success: false,
        cartElement: null,
        error: '',
    };

    add_to_cart_event.preventDefault();
    
    let addToCartBtn = add_to_cart_event.target;
    let cart = document.querySelector(cart_selector);
    if(add_to_cart_event instanceof Event){
        if(cart){
            response.cartElement = cart;
    
            /* ----------------------------------------------- */
            /*              With cart Animation                */
            /* ----------------------------------------------- */
            if(!document.querySelector('#cart_animation')){
                let cssContents = ` 

                .vertical-shake {
                    animation: vertical-shaking ${cart_animation_time}s ease-in-out forwards;
                }

                .horizontal-shake {
                    animation: horizontal-shaking ${cart_animation_time}s ease-in-out forwards;
                }

                .rise-shake {
                    animation: rise-shaking ${cart_animation_time}s ease-in-out forwards;
                }

                @keyframes vertical-shaking {
                    0% { transform: translateY(0) }
                    25% { transform: translateY(5px) }
                    50% { transform: translateY(-5px) }
                    75% { transform: translateY(5px) }
                    100% { transform: translateY(0) }
                }

                @keyframes horizontal-shaking {
                    0% { transform: translateX(0) }
                    25% { transform: translateX(5px) }
                    50% { transform: translateX(-5px) }
                    75% { transform: translateX(5px) }
                    100% { transform: translateX(0) }
                }

                @keyframes rise-shaking {
                    0% { transform: translateX(0) rotate(0)}
                    15% { transform: translateY(-2px) rotate(-17deg) }
                    30% { transform: translateY(-3px) rotate(17deg) }
                    45% { transform: translateY(-2px) rotate(-17deg) }
                    60% { transform: translateY(-3px) rotate(17deg) }
                    90% { transform: translateY(-2px) rotate(-17deg) } 
                    100% { transform: translateY(0) rotate(0) }
                }             

                `
                let style_el = document.createElement('style')
                style_el.id = 'cart_animation';
                var head = document.getElementsByTagName('head')[0];
                if (style_el.styleSheet) {   // IE
                    style_el.styleSheet.cssText = cssContents;
                } else {                // the world
                    style_el.appendChild(document.createTextNode(cssContents));
                }
                head.appendChild(style_el);
            } /* ----------End Cart Animation---------------- */
    
    
            let cartBound = cart.getBoundingClientRect();
            let product = (product_selector instanceof HTMLElement) ? product_selector : addToCartBtn.closest(product_selector);
            if(product){
                let target = (product.matches(target_selector) || target_selector==='__SELF__') ? product : product.querySelector(target_selector);
                if(target){
                    let bound = target.getBoundingClientRect();
                    Array.from({length: Number(quantity)}).fill(1).forEach((v, i)=>{
                        const adjust_position = i * clone_gap;
                        const adjust_time = +((i * step_time) / 1000).toFixed(2);
        
                        let clonedTarget = target.cloneNode(true);     
                        if(target_style) clonedTarget.setAttribute('style', target_style);
                        clonedTarget.classList.add(target_class);
                        clonedTarget.style.width = bound.width + 'px';
                        clonedTarget.style.height = bound.height + 'px';
                        clonedTarget.style.position = 'fixed';
                        clonedTarget.style.textWrape = 'nowrap';
                        clonedTarget.style.overflow = 'hidden';
                        clonedTarget.style.zIndex = '100000000000';
                        clonedTarget.style.pointerEvents = 'none';
                        clonedTarget.style.transition = `all ${animation_time + adjust_time}s`;
                        clonedTarget.style.left = bound.left + adjust_position + 'px';
                        clonedTarget.style.top = bound.top + adjust_position + 'px';
        
                        document.body.appendChild(clonedTarget);
        
                        // Animation startaddToCartBtn
                        setTimeout(()=>{
                            
                            clonedTarget.style.left = (cartBound.left + target_adjust_left) + 'px';
        
                        
                            const y = add_to_cart_event.y;        
                            
                            let top_distance = bound.top - cartBound.top
                            if(top_distance > window.innerHeight){         
                                clonedTarget.style.top = `-100px`;
                            }else{
                                let cart_in_footer = cartBound.top > bound.top;
                                if(cart_in_footer){
                                    if(cartBound.top > (window.innerHeight + 200)){
                                        clonedTarget.style.top = `${window.innerHeight + 100}px`;
                                    } else {
                                        clonedTarget.style.top = (cartBound.top + target_adjust_top) + 'px';
                                    }
                                } else {
                                    clonedTarget.style.top = (cartBound.top + target_adjust_top) + 'px';
                                }
                            }
        
                            clonedTarget.style.opacity = target_opacity;
                            clonedTarget.style.width = (target_width || cartBound.width) + 'px';
                            clonedTarget.style.height = (target_height || cartBound.height) + 'px';
        
        
                            setTimeout(()=>{
                                clonedTarget.remove();
                                response.success = true;                        
                            }, ((animation_time + adjust_time) * 1000));               
        
                        }, 0);
                    })
                    
                } else {
                    response.error = 'Target not found';
                }
            } else {
                response.error = 'Product not found';
            }
        } else {
            response.error = 'Cart element not found'
        }
    } else {
        response.error = 'First Parameter is not a valid event object'
    }
    let extra_time_when_qty_is_1_more = (quantity - 1) * step_time;

    function showCartAnimation(){
        if(!cart_animation_class) return;
        const animationClasses = [
            'rise-shake',
            'vertical-shake',
            'horizontal-shake',
        ]

        const randBetween = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        

        if(cart_animation_class == 'random'){
            cart_animation_class = animationClasses[randBetween(0, animationClasses.length - 1)];
        } else if(animationClasses.includes(cart_animation_class)){
            cart_animation_class = cart_animation_class;
        } else {
            return;
        }

        cart.classList.add(cart_animation_class);
        setTimeout(() => {
            cart.classList.remove(cart_animation_class);
        }, (cart_animation_time * 1000));        
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {    
            resolve(response);  
            showCartAnimation();
            if(after_add_click_on_cart && response.cartElement){
                response.cartElement.click();
            }
        }, (animation_time * 1000) + 10 + extra_time_when_qty_is_1_more);
    }); 
}




 

document.addEventListener('DOMContentLoaded', (e)=>{
    let cartEl = document.querySelector('#cart')
    cartEl.addEventListener('click',(e)=>{
        console.log('Cart is opening')
    })

    document.addEventListener('click', function(e){
        if(e.target.matches('.addToCart')){      
            let qty = e.target.parentNode.querySelector('input').value | 1  

            dropToCart(e, {
                target_selector: 'img',
                target_adjust_left: 8,
                target_adjust_top: 5,
                quantity: qty,
                clone_gap: -20,
                step_time: 200, 
                after_add_click_on_cart: true,
            } ).then(({success}) => {
                console.log({success});
            })
        }
        else if(e.target.matches('.addToCart2')){    
            
            let qty = e.target.parentNode.querySelector('input').value | 1
            console.log({qty});
      
            dropToCart(e, {
                // target_selector: '.product',
                target_selector: 'img',
                cart_selector: '#cartFooter',
                target_adjust_left: 8,
                target_adjust_top: 5,
                quantity: qty,
                clone_gap: -20,                
            } ).then(({success}) => {
                console.log({success});
            })
        }
    })
})
