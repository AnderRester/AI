// Change mode to redactor/default

// Item status
let selectedItem = 0;

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "Digit1":
            console.warn("Entered default mode");
            break;
        case "Digit2":
            console.warn("Entered redactor mode");
            const mouseMoveEvent = document.addEventListener("mousemove", (e) => {
                buildingTools(e.movementX, e.movementY);
            });
            break;
    }
    // console.log(e.code);
});
