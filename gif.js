// ------------------------------
// 1. Bán cầu: bố trí các mục quanh GIF
// ------------------------------
const radius = 120; // khoảng cách từ tâm ra các mục
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

// ------------------------------
// 2. Kéo GIF tự do: hỗ trợ chuột & cảm ứng
// ------------------------------
const gif = document.getElementById("draggableGif");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Lấy vị trí tương thích chuột & cảm ứng
function getPosition(e) {
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
}

function startDrag(e) {
  e.preventDefault();
  isDragging = true;
  const pos = getPosition(e);
  offsetX = pos.x - gif.offsetLeft;
  offsetY = pos.y - gif.offsetTop;
  gif.style.cursor = "grabbing";
}

function onDrag(e) {
  if (!isDragging) return;
  const pos = getPosition(e);
  gif.style.left = (pos.x - offsetX) + "px";
  gif.style.top = (pos.y - offsetY) + "px";
  gif.style.right = "auto";
  gif.style.transform = "none";
}

function endDrag() {
  isDragging = false;
  gif.style.cursor = "grab";
}

// Chuột
gif.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", endDrag);

// Cảm ứng (mobile)
gif.addEventListener("touchstart", startDrag, { passive: false });
document.addEventListener("touchmove", onDrag, { passive: false });
document.addEventListener("touchend", endDrag);
