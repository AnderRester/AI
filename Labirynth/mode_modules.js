const buildingTools = (mouseX, mouseY, width) => {
    const buildElementsArray = [1, 2, 3, 4];
    console.log("X:" + mouseX);
    console.log("Y:" + mouseY);
    document.addEventListener("wheel", (e) => {
        // console.log("X:" + e.deltaX);
        console.log("Y:" + e.deltaY);
        // console.log("Z:" + e.deltaZ);
        // console.log("Mode:" + e.deltaMode);
        if (e.deltaY > 0) {
            selectedItem >= buildElementsArray.length - 1
                ? (selectedItem = 0)
                : (selectedItem += 1);
            console.log(selectedItem);
        } else if (e.deltaY < 0) {
            selectedItem <= 0
                ? (selectedItem = buildElementsArray.length - 1)
                : (selectedItem -= 1);
            console.log(selectedItem);
        }

        document.addEventListener("mousedown", () => {});
    });
};
