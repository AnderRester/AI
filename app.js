canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = 300;
// canvas.width = window.innerWidth;

ctx.fillStyle = "#e7e7e7";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const roadTest = new Road(canvas.width / 2, canvas.width * 0.9);

const carTest = new Car({
    position: { x: roadTest.getLaneCetner(1), y: canvas.height / 2 }, "KEYS"
});

const traffic = [new Car(roadTest.getLaneCetner(1), -100, 30, 50, "KEYS")];

const animate = () => {
    requestAnimationFrame(animate);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(roadTest.borders);
    }
    ctx.fillStyle = "#a7a7a7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(0, -carTest.position.y + canvas.height * 0.7);
    roadTest.draw();
    carTest.update(roadTest.borders);

    ctx.restore();
};

animate();
