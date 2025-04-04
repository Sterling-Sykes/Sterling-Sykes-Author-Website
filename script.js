<script>
  const bgCanvas = document.getElementById('stars-background');
  const overlayCanvas = document.getElementById('stars-overlay');
  const bgCtx = bgCanvas.getContext('2d');
  const overlayCtx = overlayCanvas.getContext('2d');

  let stars = [], width, height;

  function resizeCanvases() {
    width = window.innerWidth;
    height = window.innerHeight;
    bgCanvas.width = width;
    bgCanvas.height = height;
    overlayCanvas.width = width;
    overlayCanvas.height = height;
  }

  function createStars(count, speed) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speed: speed + Math.random() * 0.1
    }));
  }

  function drawStars(ctx, stars, opacity) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateStars(stars) {
    for (let s of stars) {
      s.y += s.speed;
      if (s.y > height) {
        s.y = 0;
        s.x = Math.random() * width;
      }
    }
  }

  function animate() {
    updateStars(stars);
    drawStars(bgCtx, stars, 0.3);
    requestAnimationFrame(animate);
  }

  function shootingStar() {
    const x = Math.random() * width * 0.8 + width * 0.1;
    const y = Math.random() * height * 0.5;
    const length = 150;
    const angle = Math.random() * 0.2 - 0.1;
    let opacity = 1;

    function draw() {
      overlayCtx.clearRect(0, 0, width, height);
      overlayCtx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      overlayCtx.lineWidth = 2;
      overlayCtx.beginPath();
      overlayCtx.moveTo(x, y);
      overlayCtx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
      overlayCtx.stroke();
      opacity -= 0.02;
      if (opacity > 0) requestAnimationFrame(draw);
      else overlayCtx.clearRect(0, 0, width, height);
    }

    draw();
    setTimeout(shootingStar, Math.random() * 10000 + 15000);
  }

  function addParallaxEffect() {
    const planets = document.querySelectorAll('.planet');
    planets.forEach(p => {
      p.addEventListener('mouseenter', () => {
        bgCanvas.style.transform = 'translateY(-2px) scale(1.01)';
      });
      p.addEventListener('mouseleave', () => {
        bgCanvas.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  window.addEventListener('resize', () => {
    resizeCanvases();
    stars = createStars(80, 0.15);
  });

  // Init
  resizeCanvases();
  stars = createStars(80, 0.15);
  animate();
  shootingStar();
  addParallaxEffect();
</script>