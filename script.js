document.addEventListener("DOMContentLoaded", () => {
  const planets = document.querySelectorAll(".planet");
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsets = [
    { r: 400, a: 260 },
    { r: 460, a: 200 },
    { r: 450, a: 25 },
    { r: 500, a: 110 },
    { r: 540, a: 135 }
  ];

  planets.forEach((planet, i) => {
    const rad = offsets[i].a * Math.PI / 180;
    const x = centerX + offsets[i].r * Math.cos(rad);
    const y = centerY + offsets[i].r * Math.sin(rad);
    planet.style.left = `${x - 50}px`;
    planet.style.top = `${y - 50}px`;
  });
});