
function dropToCart(addToCartEvent, {
    productAreaSelector='.product',
    targetInsideOfProduct='img',
    cartSelector='#cart',
    animationInSecond=1.1,
    target_opacity=0.5,
    target_width=20, // in pixel
    target_height=20, // in pixel
    target_adjust_left=0, // in pixel
    target_adjust_top=0, // in pixel
    target_style='',
}={}){
    let addToCartBtn = addToCartEvent.target;
    let cart = document.querySelector(cartSelector);
    let cartBound = cart.getBoundingClientRect();
    if(cart){
        let product = addToCartBtn.closest(productAreaSelector);
        let img = product.querySelector(targetInsideOfProduct);
        let bound = img.getBoundingClientRect();
        if(img){
            let clonedImg = img.cloneNode(true);     
            if(target_style) clonedImg.setAttribute('style', target_style);
            clonedImg.style.width = bound.width + 'px';
            clonedImg.style.height = bound.height + 'px';
            clonedImg.style.position = 'fixed';
            clonedImg.style.left = bound.left + 'px';
            clonedImg.style.top = bound.top + 'px';
            clonedImg.style.zIndex = '100000000000';
            clonedImg.style.transition = `all ${animationInSecond}s`;

            document.body.appendChild(clonedImg);

            // Animation startaddToCartBtn
            setTimeout(()=>{
                
                clonedImg.style.left = (cartBound.left + target_adjust_left) + 'px';

              
                const y = addToCartEvent.y;        
                
                let top_distance = bound.top - cartBound.top
                if(top_distance > window.innerHeight){
         
                    console.log('calculation', bound.height - y)
                    // clonedImg.style.top = `${bound.height - y}px`;
                    clonedImg.style.top = `-100px`;
                }else{
                    clonedImg.style.top = (cartBound.top + target_adjust_top) + 'px';
                }

                clonedImg.style.opacity = target_opacity;
                clonedImg.style.width = (target_width || cartBound.width) + 'px';
                clonedImg.style.height = (target_height || cartBound.height) + 'px';


                setTimeout(()=>{
                    clonedImg.remove();
                }, (animationInSecond + 1000))
            }, 0);
        }
    }
}

document.addEventListener('DOMContentLoaded', (e)=>{
    document.addEventListener('click', function(e){
        let { target } = e;
        e.preventDefault()

        if(target.matches('.addToCart')){
            dropToCart(e, {
                cartIsInFixdPosition: false,
                target_adjust_left: 5,
                target_adjust_top: 5,
                target_style: 'border-radius:15px;border: 4px solid red',
            })
        }
    })
})
