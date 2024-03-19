const canvas = document.querySelector(".lab-canvas");
canvas.width = 576;
canvas.height = 576;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#e7e7e7";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const rat = new Rat({
    position: { x: 100, y: 100 },
    color: "red",
    controlType: "USER",
    maxSpeed: 8,
    src: "./assets/rat.png",
});

const animation = (time) => {
    ctx.fillStyle = "#e7e7e7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(0, -rat.position.y + ctx.height * 0.7);
    rat.update();
    rat.draw();
    ctx.restore();
    requestAnimationFrame(animation);
};

animation();
