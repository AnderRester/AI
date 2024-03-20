class Rat {
    constructor({
        position,
        width = 40,
        height = 60,
        color = "black",
        controlType = "AI",
        maxSpeed = 5,
        img,
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.angle = 0;

        this.speed = 0;
        this.acceleration = 0.1;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.controls = new Controls(controlType);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // if (this.speed != 0) {
        // if(this.speed)
        const flip = this.speed > 0 ? 1 : -1;
        // const flip = 1;
        if (this.speed != 0) {
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        // }

        this.position.x -= Math.sin(this.angle) * this.speed;
        this.position.y -= Math.cos(this.angle) * this.speed;
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.position.x - Math.sin(this.angle - alpha) * rad,
            y: this.position.y - Math.cos(this.angle - alpha) * rad,
        });
        points.push({
            x: this.position.x - Math.sin(this.angle + alpha) * rad,
            y: this.position.y - Math.cos(this.angle + alpha) * rad,
        });
        points.push({
            x: this.position.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.position.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });
        points.push({
            x: this.position.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.position.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });
        return points;
    }

    update() {
        this.#move();
        this.polygon = this.#createPolygon();
        // console.log(this.polygon);
    }
}
