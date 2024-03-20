// Trace mouse show where item will be placed, place build item
document.addEventListener("mousedown", (mouseData) => {
    buildElementsArray.push(
        new buildItem({
            position: { x: mouseData.x - rect.left, y: mouseData.y - rect.top },
            size: Array(blockProjections[selectedItem]),
        })
    );
});

// Show position, where block will be placed
const displayBlockPlace = () => {
    new buildItem({
        position: { x: mousePos.x, y: mousePos.y },
        size: [2, 1],
    }).draw();
};

// Flip Item
const flipItem = () => {
    blockProjections[selectedItem] = blockProjections[selectedItem].reverse();
    console.log(blockProjections[selectedItem]);
};

// Change build item
const wheelEvent = document.addEventListener("wheel", (e) => {
    // document.removeEventListener("mousewheel", wheelEvent);
    // console.log("Y:" + e.deltaY);
    if (blockProjections.length >= 1) {
        if (e.deltaY > 0) {
            selectedItem >= blockProjections.length - 1 ? (selectedItem = 0) : (selectedItem += 1);
            console.log(selectedItem);
        } else if (e.deltaY < 0) {
            selectedItem <= 0 ? (selectedItem = blockProjections.length - 1) : (selectedItem -= 1);
            console.log(selectedItem);
        }
    }
});

// Show build grid
class GridView {
    constructor(dimension) {
        this.dimension = dimension;
    }

    draw() {
        const margin = canvas.width / this.dimension;
        // console.log(margin);
        for (let i = 0; i < this.dimension; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = "black";
            ctx.moveTo(i * margin, 0);
            ctx.lineTo(i * margin, canvas.width);
            ctx.moveTo(0, i * margin);
            ctx.lineTo(canvas.width, i * margin);
            ctx.stroke();
        }
    }
}

// Build item
class buildItem {
    constructor({ position, size }) {
        this.position = position;
        this.size = size;

        console.log(blockSize);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(
            this.position.x - (this.size[0] * blockSize) / 2,
            this.position.y - (this.size[1] * blockSize) / 2,
            this.size[0] * blockSize,
            this.size[1] * blockSize
        );
    }
}
