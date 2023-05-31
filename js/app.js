import { valida } from "./validacionesJS.js";

const inputs = document.querySelectorAll("input");//dpcoment.querySelectorAll regresa un arreglo

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});


