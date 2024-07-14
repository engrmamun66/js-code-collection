
function dropToCart(add_to_cart_event, {
    product_selector='.product',
    target_selector='img',
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
    clone_gap=20, // For Multiple Qty
    step_time=500, // For Multiple Qty
}={}){

    let is_success = false;

    add_to_cart_event.preventDefault();

    let addToCartBtn = add_to_cart_event.target;
    let cart = document.querySelector(cart_selector);
    if(cart){
        let cartBound = cart.getBoundingClientRect();
        let product = addToCartBtn.closest(product_selector);
        let target = product.matches(target_selector) ? product : product.querySelector(target_selector);
        if(target){
            let bound = target.getBoundingClientRect();
            Array.from({length: quantity}).fill(1).forEach((v, i)=>{
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
                        // clonedTarget.style.top = `-100px`;
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
                        is_success = true;
                    }, ((animation_time + adjust_time) * 1000));               

                }, 0);
            })
            
        }
    }
    
    let extra_time_when_qty_is_1_more = (quantity - 1) * step_time;

    return new Promise((resolve, reject) => {
        setTimeout(() => {    
            resolve({success: is_success});           
        }, (animation_time * 1000) + 10 + extra_time_when_qty_is_1_more);
    }); 
}

document.addEventListener('DOMContentLoaded', (e)=>{
    document.addEventListener('click', function(e){
        if(e.target.matches('.addToCart')){           
            dropToCart(e, {
                target_selector: 'img',
                target_adjust_left: 8,
                target_adjust_top: 5,
                quantity: 5,
                clone_gap: 60,
                step_time: 200,
            } ).then(({success}) => {
                console.log({success});
            })
        }
        if(e.target.matches('.addToCart2')){          
      
            dropToCart(e, {
                // target_selector: '.product',
                target_selector: 'img',
                cart_selector: '#cartFooter',
                target_adjust_left: 8,
                target_adjust_top: 5,
            } ).then(({success}) => {
                console.log({success});
            })
        }
    })
})
