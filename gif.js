 const radius = 120; // bán kính từ tâm gif
  const centerX = 50;
  const centerY = 50;

  document.querySelectorAll('.menu-item').forEach(el => {
    const angleDeg = parseFloat(el.dataset.angle);
    const angleRad = angleDeg * (Math.PI / 180);

    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);

    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
  });
const gif = document.getElementById("draggableGif");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

gif.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - gif.offsetLeft;
  offsetY = e.clientY - gif.offsetTop;
  gif.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  gif.style.left = (e.clientX - offsetX) + "px";
  gif.style.top = (e.clientY - offsetY) + "px";
  gif.style.transform = "none";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  gif.style.cursor = "grab";
});
