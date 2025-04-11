function onLoadImage(event){
  

    let lastTime = Date.now();
    const img = event.target 
  
    const observer = new MutationObserver(() => {
      console.log('Image src updated or attributes changed');
    });
  
    observer.observe(img, { attributes: true, attributeFilter: ['src'] });
  
    let interval = null
  
    interval = setInterval(() => {
      const currentTime = Date.now();
      if (img.naturalWidth !== 0 && img.complete) {
        if(!String(img.src).endsWith('img/live-camera.png')){
          H.delay(()=>img.setAttribute('loaded', 'true'), 500) 
          clearInterval(interval)
        }
      } else if (currentTime - lastTime > 5000) {
        console.warn('Still no image rendering');
      }
    }, 200);
  
    setTimeout(() => {
      if(img.getAttribute('loaded') != 'true'){
        img.setAttribute('loadedbypass', 'true')
      }
    }, 1000 * 15);
  }