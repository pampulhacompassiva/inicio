document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-container');
  const hero = document.querySelector('.hero');

  if (!nav || !hero) {
    console.warn('Barra de navegação ou seção hero não encontradas.');
    return;
  }

  const navHeight = nav.offsetHeight;

  const observerOptions = {
    root: null, // Observa em relação à viewport
    // O threshold é uma lista de percentagens de visibilidade do elemento alvo
    // que disparam o callback. Usar um array detalhado ajuda a pegar a transição suavemente.
    threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Gera [0, 0.01, 0.02, ..., 1.0]
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // entry.target é a seção .hero
      const heroRect = entry.boundingClientRect; // Posição da hero relativa à viewport

      // A nav deve mudar de cor se:
      // 1. O topo da hero está acima da parte inferior da nav (heroRect.top < navHeight)
      // E
      // 2. O fundo da hero ainda está abaixo da parte inferior da nav (heroRect.bottom > navHeight)
      // Isso significa que a área da hero está efetivamente "atrás" da área da nav.
      if (heroRect.top < navHeight && heroRect.bottom > navHeight) {
        nav.classList.add('scrolled-on-hero');
      } else {
        nav.classList.remove('scrolled-on-hero');
      }
    });
  }, observerOptions);

  // Começa a observar a seção hero
  if (hero) {
    heroObserver.observe(hero);
  }
});
