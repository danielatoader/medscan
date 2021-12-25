
let errorAudio = new Audio("sounds/error.wav");

export const playSuccessSound = () => {
    // new Audio("sounds/success.wav").play();
}

export const playErrorSound = () => {
    errorAudio.play();
}