
function dropToCart(add_to_cart_event, {
    product_area_selector='.product',
    target_selector='img',
    cart_selector='#cart',
    animation_in_second=1.5,
    target_opacity=0.5,
    target_width=20, // in pixel
    target_height=20, // in pixel
    target_adjust_left=0, // in pixel
    target_adjust_top=0, // in pixel
    target_style='',
}={}){

    let is_success = false;

    let addToCartBtn = add_to_cart_event.target;
    let cart = document.querySelector(cart_selector);
    if(cart){
        let cartBound = cart.getBoundingClientRect();
        let product = addToCartBtn.closest(product_area_selector);
        let img = product.matches(target_selector) ? product : product.querySelector(target_selector);
        if(img){
            let bound = img.getBoundingClientRect();
            let clonedImg = img.cloneNode(true);     
            if(target_style) clonedImg.setAttribute('style', target_style);
            clonedImg.style.width = bound.width + 'px';
            clonedImg.style.height = bound.height + 'px';
            clonedImg.style.position = 'fixed';
            clonedImg.style.left = bound.left + 'px';
            clonedImg.style.top = bound.top + 'px';
            clonedImg.style.textWrape = 'nowrap';
            clonedImg.style.overflow = 'hidden';
            clonedImg.style.zIndex = '100000000000';
            clonedImg.style.transition = `all ${animation_in_second}s`;

            document.body.appendChild(clonedImg);

            // Animation startaddToCartBtn
            setTimeout(()=>{
                
                clonedImg.style.left = (cartBound.left + target_adjust_left) + 'px';

              
                const y = add_to_cart_event.y;        
                
                let top_distance = bound.top - cartBound.top
                if(top_distance > window.innerHeight){         
                    // clonedImg.style.top = `-100px`;
                    clonedImg.style.top = `-100px`;
                }else{
                    let cart_in_footer = cartBound.top > bound.top;
                    if(cart_in_footer){
                        if(cartBound.top > (window.innerHeight + 200)){
                            clonedImg.style.top = `${window.innerHeight + 100}px`;
                        } else {
                            clonedImg.style.top = (cartBound.top + target_adjust_top) + 'px';
                        }
                    } else {
                        clonedImg.style.top = (cartBound.top + target_adjust_top) + 'px';
                    }
                }

                clonedImg.style.opacity = target_opacity;
                clonedImg.style.width = (target_width || cartBound.width) + 'px';
                clonedImg.style.height = (target_height || cartBound.height) + 'px';


                setTimeout(()=>{
                    clonedImg.remove();
                    is_success = true;
                }, (animation_in_second * 1000));               

            }, 0);
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {    
            resolve({success: is_success});           
        }, (animation_in_second * 1000) + 10);
    }); 
}

document.addEventListener('DOMContentLoaded', (e)=>{
    document.addEventListener('click', function(e){
        let { target } = e;
        e.preventDefault()

        if(target.matches('.addToCart')){
           
            dropToCart(e, {
                target_selector: '.product',
                cart_selector: '#cartFooter',
                target_adjust_left: 5,
                target_adjust_top: 5,
            } ).then(({success}) => {
                console.log({success});
            })
        }
    })
})
