const maxSize = 100;

function populateWeights(){
    let weights = document.querySelectorAll(".att-weight");
    for (let w of weights) {
        let wValue = w.getAttribute("data-weight");
        let frameBar = document.createElement("div");
        frameBar.style.width = `${maxSize+2}px`;
        frameBar.style.border = "1px solid black"
        w.appendChild(frameBar);
        let weightBar = document.createElement("div");
        weightBar.innerHTML = `${wValue *100}%`
        weightBar.style.width = `${maxSize*wValue}px`;
        weightBar.style.backgroundColor = "red";
        frameBar.appendChild(weightBar);
        
    }
}

populateWeights();