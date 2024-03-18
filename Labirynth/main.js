const canvas = document.querySelector(".lab-canvas");
canvas.width = 576;
canvas.height = 576;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#e7e7e7";
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Rat {
    constructor({ position, width = 40, height = 40, color = "black", controlType = "AI" }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });
        return points;
    }

    update() {
        this.polygon = this.#createPolygon();
    }
}

const rat = new Rat({ position: { x: 100, y: 100 }, color: "red" });

const animation = () => {
    rat.update();
    rat.draw();
    requestAnimationFrame(animation);
};
