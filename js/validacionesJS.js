export function valida(input) {
  const tipoDeInput = input.dataset.tipo; //con el dataSet.tipo obtenemos la coleccion de todos los data y el .tipo indica que es el data.tipo
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  const tipoDeInput2 = input.dataset.tipo2;
  if (validarTel[tipoDeInput]) {
    validarTel[tipoDeInput](input);
  }
  
  //console.log(input.parentElement);
  //validando si lo ingresado en el input es valido
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input)
  }

}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
  "numero",
]
  

const mensajeDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio"
  },

  email: {
    valueMissing: "El campo nombre no puede estar vacio",
    typeMismatch: "El correo no es valido"
  },

  password: {
    valueMissing: "El campo password no puede estar vacio",
    patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales"
  },

  nacimiento: {
    valueMissing: "El campo nacimiento no puede estar vacio",
    customError: "¡Debes tener al menos 18 años de edad!"
  },

  numero: {
    //valueMissing: "El campo Telefono no puede estar vacio",
    customError: "¡El formato requerdido es +51XXXXXXXXX, +51 seguido de 9 numeros!"
  },

  direccion: {
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    valueMissing: "Este campo no puede estar vacío",
  },

  ciudad: {
    patternMismatch: "El nombre de la ciudad debe contener entre 3 a 40 caracteres.",
    valueMissing: "Este campo no puede estar vacío",
  },

  estado: {
    patternMismatch: "El nombre del estado debe contener entre 3 a 40 caracteres.",
    valueMissing: "Este campo no puede estar vacío",
  },

  region: {
    patternMismatch: "El nombre de la región debe contener entre 3 a 40 caracteres.",
    valueMissing: "Este campo no puede estar vacío",
  },
};


const validadores = {
  //Coincidir el nombre del tipo con la llave de este objeto
  nacimiento: (input) => validarNacimiento(input),
};

const validarTel = {
  numero: (input) => validarTelefono(input),
};


function mostrarMensajeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach(error => {
    if (input.validity [error]){
      //console.log(error);
      //console.log(input.validity[error]);
      //console.log(mensajeDeError[tipoDeInput][error]);
      mensaje = mensajeDeError[tipoDeInput][error];
    }
  })
  return mensaje;
}

function validarTelefono(input){
  const peruRegex = /^\+51\d{9}$/;
  const numeroTelefono = input.value;

  let mensaje = "";
  if (!numeroTelefono.match(peruRegex)) {
    mensaje = "¡El formato requerdido es +51 XXXXXXXXX, +51 seguido de 9 numeros!";
  }
  input.setCustomValidity(mensaje);
}


function validarNacimiento(input) {
  const fechaCliente = new Date(input.value); //crear instancia de la clase date
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "¡Debes tener al menos 18 años de edad!";
    console.log(mensaje);    
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date(); //crea instancia de la clase date y toma automaticamente la fecha actual
  const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDay());
  return diferenciaFechas <= fechaActual;
}

