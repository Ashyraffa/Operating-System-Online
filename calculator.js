const result =
document.getElementById("result");
const buttonsContainer =
document.getElementById("buttons");
const buttons = [
    "7", "8", "9", "C",
    "4", "5", "6", "+",
    "1", "2", "3", "*",
    "0", ".", "=", "-",
    "/"
];
buttons.forEach(button => {
    const btn =
    document.createElement("button");
    btn.textContent = button;
    btn.onclick = () => 
    handleButtonClick(button);
    buttonsContainer.appendChild(btn);
});
function handleButtonClick(value) {
    if (value === "C") {
        result.value = "";
    } else if (value === "=") {
        try {
            result.value = eval(result.value);
        } catch {
            result.value = "Error";
        }
    } else {
        if (result.value === "0" || result.value === "") {
            result.value = value;
         } else {
                result.value += value;
            }
        }
    }
