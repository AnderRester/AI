class Car {
    constructor({ position }) {
        this.color = "#000";
        this.position = position;
        this.width = 20;
        this.height = 40;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;

        this.sensor = new Sensor(this);
        this.controls = new Controls();
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

    draw() {
        if (this.damaged) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
        this.sensor.draw();
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
        if (this.speed < -this.maxSpeed) {
            this.speed = -(this.maxSpeed / 2);
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
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.position.x -= Math.sin(this.angle) * this.speed;
        this.position.y -= Math.cos(this.angle) * this.speed;
    }

    update(roadBorders) {
        if (!this.damaged) {
            this.#move();
            this.sensor.update(roadBorders);
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders);
        }
        this.draw();
    }

    #assessDamage(borders) {
        for (let i = 0; i < borders.length; i++) {
            if (polysIntersect(this.polygon, borders[i])) return true;
        }
        return false;
    }
}
