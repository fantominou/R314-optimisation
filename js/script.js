(() => {
  // Tâche légère exécutée en arrière-plan (pendant l'inactivité)
  function backgroundWork() {
    try {
      const small = new Array(1024).fill(0).map(() => Math.random());
      window.__waste = small; // placeholder léger
    } catch (e) {
      /* noop */
    }
  }

  // Planification du travail non critique
  if ('requestIdleCallback' in window) {
    requestIdleCallback(backgroundWork, { timeout: 2000 });
  } else {
    setTimeout(backgroundWork, 1500);
  }

  // Gestion du chargement des images
  window.addEventListener('load', () => {
    document.querySelectorAll('.card img').forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
      }
    });
  });
})();
