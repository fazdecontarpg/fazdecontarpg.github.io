document.addEventListener('DOMContentLoaded', () => {
  // SINTETIZADOR DE EFEITOS SONOROS (Web Audio API)
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Som de Plim-Plim Mágico
  function playMagicSound() {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  }

  // Som de Rolar Dados
  function playDiceSound() {
    initAudio();
    if (!audioCtx) return;

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150 + Math.random() * 200, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      }, i * 80);
    }
  }

  // 1. Menu Hamburguer Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      playMagicSound();
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 2. Rolagem Suave dos Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Mini-jogo do Dado Mágico no Hero
  const rollDiceBtn = document.getElementById('rollDiceBtn');
  const diceIcon = document.getElementById('diceIcon');
  const diceResult = document.getElementById('diceResult');

  const diceMessages = {
    1: "🎲 Rolou 1! Um tropeço desajeitado, mas com um sorriso no rosto!",
    2: "🎲 Rolou 2! Você ouve um zumbido suspeito na floresta...",
    3: "🎲 Rolou 3! Você encontrou um pergaminho antigo de poção!",
    4: "🎲 Rolou 4! Defesa bem-sucedida! Seu escudo brilhou!",
    5: "🎲 Rolou 5! Sucesso! Um Inseto Gigante saiu correndo!",
    6: "🎲 Rolou 6! CRÍTICO MÁGICO! A Vila Velha celebra sua vitória! 🌟"
  };

  if (rollDiceBtn && diceIcon && diceResult) {
    rollDiceBtn.addEventListener('click', () => {
      playDiceSound();
      diceIcon.classList.add('rolling');
      diceResult.style.opacity = '0.5';
      diceResult.textContent = 'Girando os dados do destino...';

      setTimeout(() => {
        diceIcon.classList.remove('rolling');
        const result = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = diceMessages[result];
        diceResult.style.opacity = '1';
        playMagicSound();
      }, 600);
    });
  }

  // 4. ROLAGENS DE REVELAÇÃO (Cards Interativos)
  const magicCards = document.querySelectorAll('.magic-card');

  magicCards.forEach(card => {
    card.addEventListener('click', () => {
      const revelationText = card.getAttribute('data-revelation');
      const paragraph = card.querySelector('p');

      if (!card.classList.contains('revealed')) {
        card.classList.add('revealed');
        card.setAttribute('data-original-text', paragraph.textContent);
        paragraph.textContent = revelationText;
        playMagicSound();
      } else {
        card.classList.remove('revealed');
        const originalText = card.getAttribute('data-original-text');
        if (originalText) paragraph.textContent = originalText;
      }
    });
  });

  // 5. FRASES MÁGICAS ALEATÓRIAS DO MAGO ZAIMEN (Rodapé)
  const wizardBtn = document.getElementById('wizardBtn');
  const wizardBubble = document.getElementById('wizardBubble');

  const wizardPhrases = [
    "🧙‍♂️ 'Unam-se, ajudem uns aos outros e sempre serão vitoriosos!'",
    "🧙‍♂️ 'Cuidado com os Insetos Gigantes nas Cavernas sem Luz!'",
    "🧙‍♂️ 'Prepare seus dados, a maior aventura é a sua imaginação!'",
    "🧙‍♂️ 'Em Vila Velha, até o menor dos heróis pode realizar atos gigantescos!'",
    "🧙‍♂️ 'Que a Luz Interior ilumine o caminho da sua equipe!'"
  ];

  if (wizardBtn && wizardBubble) {
    wizardBtn.addEventListener('click', () => {
      playMagicSound();
      const randomPhrase = wizardPhrases[Math.floor(Math.random() * wizardPhrases.length)];
      wizardBubble.textContent = randomPhrase;
    });
  }

  // 6. Efeito Mágico de Faíscas/Partículas ao Clicar na Tela
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 4; i++) {
      createSparkle(e.clientX, e.clientY);
    }
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'magic-sparkle';
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    const dx = (Math.random() - 0.5) * 80;
    const dy = (Math.random() - 0.5) * 80;
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);

    const colors = ['#f8b42c', '#703893', '#00a8e8', '#ffffff'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }

  // 7. Modal de Apoiadores
  const openModalBtn = document.getElementById('openSupportersModal');
  const closeModalBtn = document.getElementById('closeSupportersModal');
  const supportersModal = document.getElementById('supportersModal');

  if (openModalBtn && closeModalBtn && supportersModal) {
    openModalBtn.addEventListener('click', () => {
      supportersModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playMagicSound();
    });

    closeModalBtn.addEventListener('click', () => {
      supportersModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    supportersModal.addEventListener('click', (e) => {
      if (e.target === supportersModal) {
        supportersModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 8. Modal de Carrossel da Galeria
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModal = document.getElementById('closeGalleryModal');
  const carouselImg = document.getElementById('carouselImg');
  const carouselCaption = document.getElementById('carouselCaption');
  const carouselCounter = document.getElementById('carouselCounter');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let galleryData = [];
  let currentImageIndex = 0;

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryData.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || 'Imagem da Galeria'
      });
    }

    item.addEventListener('click', () => {
      openGallery(index);
    });
  });

  function openGallery(index) {
    currentImageIndex = index;
    updateCarousel();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playMagicSound();
  }

  function closeGallery() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function updateCarousel() {
    if (galleryData.length === 0) return;
    const currentData = galleryData[currentImageIndex];
    carouselImg.src = currentData.src;
    carouselImg.alt = currentData.alt;
    carouselCaption.textContent = currentData.alt;
    carouselCounter.textContent = `${currentImageIndex + 1} / ${galleryData.length}`;
  }

  function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateCarousel();
    playMagicSound();
  }

  function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateCarousel();
    playMagicSound();
  }

  if (galleryModal) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    closeGalleryModal.addEventListener('click', closeGallery);

    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeGallery();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!galleryModal.classList.contains('active')) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeGallery();
    });
  }

  // 9. Efeito Parallax Fluido
  const parallaxImages = document.querySelectorAll('.parallax-img');

  function updateParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    parallaxImages.forEach(img => {
      const parentSection = img.closest('section');
      if (!parentSection) return;

      const sectionTop = parentSection.offsetTop;
      const sectionHeight = parentSection.offsetHeight;

      if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        const speed = 0.35;
        const yPos = (scrollY - sectionTop) * speed;
        img.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateParallax);
  });
  
  updateParallax();
});