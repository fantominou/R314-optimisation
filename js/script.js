(function(){
  // Avoid blocking the main thread: schedule non-critical work for idle time
  function backgroundWork(){
    try{
      const small = new Array(1024).fill(0).map(()=> Math.random());
      window.__waste = small; // lightweight placeholder for diagnostics
    }catch(e){ /* noop */ }
  }

  if('requestIdleCallback' in window){
    requestIdleCallback(backgroundWork, {timeout:2000});
  }else{
    setTimeout(backgroundWork, 1500);
  }

  window.addEventListener('load', function(){
    const imgs = document.querySelectorAll('.card img');
    imgs.forEach(img => {
      if (img.complete) img.classList.add('loaded');
      else img.addEventListener('load', ()=> img.classList.add('loaded'));
    });
  });
})();
