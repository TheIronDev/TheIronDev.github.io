const {Spathy, SPATHY_ENUMS} = SpathyPackage;
const {GRAPH_ITEM_STATE} = SPATHY_ENUMS;
const canvas = document.createElement('canvas');
let nodePositionMap = new Map();
let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;
canvas.height = window.innerHeight * 2; //x2 because translating by .5
canvas.width = window.innerWidth * 2; //x2 because translating by .5
canvas.style = 'position:absolute;top: 0; left: 0; z-index: -1;';
const ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
document.body.appendChild(canvas);

let waterFrame = 0;

function drawWater(ctx, height, width, offsetX, offsetY, color) {
  const amplitude = height / 8;
  const frequency = .02;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let x = 0; x < width; x++) {
    const y = Math.sin(x * frequency + offsetX) * amplitude / 2;
    ctx.lineTo(x, height - y - offsetY);
  }
  ctx.lineTo(width, height);  
  ctx.lineTo(0, height);
  ctx.fill();
}

const options = {
  ctx,
  canvasHeight,
  canvasWidth,
  speed: 50,
  nodeGridSize: 4,
  getNodeSize() {
    return 2;
  },
  getColorByState(state) {
    switch (state) {
      case GRAPH_ITEM_STATE.ACTIVE:
        return "#ccc";
      case GRAPH_ITEM_STATE.FOCUSED:
        return "#ccc";
      default:
        return "transparent";
    }
  },
  getNodeColor(node) {
    return "#ccc";
  },
  getNodePosition({id}) {
    if (nodePositionMap.has(id)) return nodePositionMap.get(id);
    if (id === '3.3') {
      const startNode = nodePositionMap.get('0.0');
      nodePositionMap.set(id, startNode);
      return startNode;
    }
    const x = ~~(Math.random() * (this.canvasWidth - 50)) + 25;
    const y = ~~(Math.random() * this.canvasHeight / 2)+ 50;
    nodePositionMap.set(id, {x, y});
    return {x, y};
  },
  preRender(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);
  },
  postRender(ctx) {
    waterFrame++;
    const {canvasHeight, canvasWidth} = this;
    drawWater(ctx, canvasHeight, canvasWidth, (waterFrame + 40) / 20, 45, '#5d99fc');
    drawWater(ctx, canvasHeight, canvasWidth, waterFrame / 40, 55, '#166fff');
  }
};

const spathy = new Spathy(options);
spathy.start();
spathy.subscribe(SPATHY_ENUMS.SPATHY_EVENTS.COMPLETED_RENDERING, () => {
setTimeout(() => {
    spathy.stop();
    spathy.restart();
    spathy.start();  
  }, 5000);
});
window.addEventListener('resize', () => {
  console.log(1);
  canvasHeight = window.innerHeight;
  canvasWidth = window.innerWidth;
  canvas.height = window.innerHeight * 2; //x2 because translating by .5
  canvas.width = window.innerWidth * 2; //x2 because translating by .5
  // Should really make a method to update the options instead of override, oh well :)
  spathy.opts.canvasHeight = canvasHeight;
  spathy.opts.canvasWidth = canvasWidth;
  nodePositionMap = new Map();
});
