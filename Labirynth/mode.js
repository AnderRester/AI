// Change mode to redactor/default

// Item status
let selectedItem = 0;
let showGridSwitch = false;
let redactorModeSwitch = false;
let blockProjections = [
    [1, 2],
    [1, 5],
    [1, 6],
];

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "Digit1":
            console.warn("Entered default mode");
            break;
        case "Digit2":
            redactorModeSwitch = !redactorModeSwitch;
            if (redactorModeSwitch) {
                console.warn("Entered redactor mode");
                const mouseMoveEvent = document.addEventListener("mousemove", (e) => {
                    mousePos.x = e.clientX - rect.left;
                    mousePos.y = e.clientY - rect.top;
                });
                // buildingTools(mousePos);
            } else {
                document.removeEventListener("mousemove", mouseMoveEvent);
            }
            break;
        case "Digit3":
            showGridSwitch = !showGridSwitch;
            console.warn(`Grid Enabled state is ${showGridSwitch}`);
        case "KeyR":
            console.warn("Item was flipped");
            flipItem();
    }
    // console.log(e.code);
});
