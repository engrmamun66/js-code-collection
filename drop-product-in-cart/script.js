
function dropToCart(target, {
    productAreaSelector='.product',
    targetInsideOfProduct='img',
    cartSelector='#cart',
    animationInSecond=1.1,
    destination_opacity=0.5,
    destination_width=0, // in pixel >> by default auto as cart width height
    destination_height=0, // in pixel >> by default auto as cart width height
}={}){
    let addToCartBtn = target;
    let cart = document.querySelector(cartSelector);
    let cartBound = cart.getBoundingClientRect();
    if(cart){
        let product = addToCartBtn.closest(productAreaSelector);
        let img = product.querySelector(targetInsideOfProduct);
        let bound = img.getBoundingClientRect();
        if(img){
            let clonedImg = img.cloneNode(true);
            console.log(clonedImg);
            clonedImg.style.width = bound.width + 'px';
            clonedImg.style.height = bound.height + 'px';
            clonedImg.style.position = 'fixed';
            clonedImg.style.left = (bound.left + 20) + 'px';
            clonedImg.style.top = (bound.top + 20) + 'px';
            clonedImg.style.border = '1px solid green';
            clonedImg.style.zIndex = '4454545454545';
            clonedImg.style.transition = `all ${animationInSecond}s`;

            document.body.appendChild(clonedImg);

            // Animation start
            setTimeout(()=>{
                clonedImg.style.left = cartBound.left + 'px';
                clonedImg.style.top = cartBound.top + 'px';
                clonedImg.style.opacity = destination_opacity;
                clonedImg.style.width = (destination_width || cartBound.width) + 'px';
                clonedImg.style.height = (destination_height || cartBound.height) + 'px';
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
            dropToCart(target)
        }
    })
})
