const canvas = document.querySelector(".lab-canvas");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 576;
canvas.height = 576;

// Normalize position
const rect = canvas.getBoundingClientRect();

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#e7e7e7";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const rat = new Rat({
    position: { x: 100, y: 100 },
    color: "red",
    controlType: "USER",
    maxSpeed: 12,
    src: "./assets/rat.png",
    width: 20,
    height: 40,
});

let mousePos = {
    x: 0,
    y: 0,
};

const buildElementsArray = [];
const gridSize = 30;
const gridView = new GridView(gridSize);
const blockSize = Math.floor(canvas.width / gridSize);

const animation = (time) => {
    ctx.fillStyle = "#e7e7e7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(0, -rat.position.y + ctx.height * 0.7);
    rat.update();
    rat.draw();
    if (showGridSwitch) gridView.draw();
    buildElementsArray.forEach((e) => {
        // console.log("Drowned an item, total items count:" + buildElementsArray.length);
        e.draw();
    });
    // console.log(buildElementsArray.length);
    if (redactorModeSwitch) displayBlockPlace();
    ctx.restore();
    requestAnimationFrame(animation);
};

animation();
