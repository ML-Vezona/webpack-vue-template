//
// Mock Canvas / Context2D calls
//
function mockCanvas(window) {
  window.HTMLCanvasElement.prototype.getContext = () => ({
    fillRect() {},
    clearRect() {},
    getImageData: (x, y, w, h) => ({
      data: new Array(w * h * 4),
    }),
    putImageData() {},
    createImageData: () => [],
    setTransform() {},
    drawImage() {},
    save() {},
    fillText() {},
    restore() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    closePath() {},
    stroke() {},
    translate() {},
    scale() {},
    rotate() {},
    arc() {},
    fill() {},
    measureText: () => ({ width: 0 }),
    transform() {},
    rect() {},
    clip() {},
  });

  window.HTMLCanvasElement.prototype.toDataURL = () => '';
}

module.exports = mockCanvas;
