// $(() => {

class Personas {
  constructor(nombre, gastos) {
    this.nombre = nombre;
    this.gastos = gastos;
  }
}

// Selectores
let cantidadPersonas = document.getElementById("selector");
var guardar = document.getElementById("guardar");
var nombre = document.getElementById("nombreForm");
var gastos = document.getElementById("gastosForm");

// Variables globales
let gastosTotal = 0;
let nombrePersona;
let gastosPersona = 0;
let cantidadFinal;

// DEFINI EL NUMERO DEL PRIMER ID
var n = 0;

// Array globales
let listadoPersonas = [];
let arrayGastosTotales = [];

/****************************  COMIENZA LA ACCIÓN ****************************/
const splash = document.querySelector(".splash");

document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 2500);
});

setTimeout(() => {
  swal("¡¡Buenas!!", "¡Seleccione la cantidad de personas reunidas!");
}, 2800);

//Evento Change, cada vez que cambio el valor del select
cantidadPersonas.onchange = () => {
  swal(
    "",
    `¡Bien! Ahora completá los nombres de los morosos y cuanto gastó cada uno.`,
    "success"
  );
};

let session = () => {
  let persona = new Personas(nombre.value, gastos.value);

  // Se hace push del nuevo Objeto persona dentro del array
  listadoPersonas.push(persona);

  // Se almacena el array de personas dentro del storage
  sessionStorage.setItem("datos", JSON.stringify(listadoPersonas));
};

// El parametro "n" hace referencia a un numero y "nombre" al nombre de la persona
const inputNombres = (n, nombre) => {
  $("#parcialesNombres").append(
    '<input type="text" class="form-control parcialNombre rounded-pill" id=' +
      "nombre-" +
      n +
      ' placeholder="Nombre" aria-label="First name">'
  );
  readonly = "readonly";
  $("#nombre-" + n).val(nombre);
};

// El parametro "n" hace referencia a un numero y "gastos" a lo que gastó cada persona
const inputGastos = (n, gastos) => {
  $("#parcialesGastos").append(
    '<input type="text" class="form-control parcialGasto rounded-pill" id=' +
      "gastos-" +
      n +
      ' placeholder="Gastó" readonly="readonly" aria-label="First name">'
  );

  $("#gastos-" + n).val(gastos);
};

// Dado el botón guardar, se realiza un evento click, para que ejecute la función dentro
guardar.addEventListener("click", function () {
  let nombreForm = $("#nombreForm").val();
  let gastosForm = $("#gastosForm").val();

  // CADA VEZ QUE SE HACE CLICK SE SUMA UNO A "n"
  n++;

  session();
  // SE UTILIZAN DOS PARÁMETROS, EL NUMERO DEL ID SUMADO +1 Y EL NOMBRE ACTUALIZADO

  inputNombres(n, nombreForm);
  inputGastos(n, gastosForm);

  // Esto hace que cada vez que se ingrese un nombre, se vuelva a reiniciar cada input.
  nombre.value = "";
  gastos.value = "";
});

//creo un boton para luego empujar los gastos totales al input creado debajo
let btnCalcular = document.createElement("button");
btnCalcular.setAttribute("id", "botonTotalGastos");
btnCalcular.setAttribute("class", "btn btn-secondary  rounded-pill col-md-3");
btnCalcular.textContent = "Haz click para ver el total de gastos";

document.getElementById("gastosTotales").appendChild(btnCalcular);

//creo un elemento "input" tipo number
let entradaTotales = document.createElement("input");
entradaTotales.setAttribute("type", "number");
entradaTotales.setAttribute("id", "mostrar");
entradaTotales.setAttribute(
  "class",
  "inputGastosTotales form-control rounded-pill"
);
entradaTotales.setAttribute("step", "0.01");

document.getElementById("mostrarGastos").appendChild(entradaTotales);

// Le asigné el id prueba al botón "Haz click para ver el total de gastos"

$("#botonTotalGastos").click(function () {
  let storage = JSON.parse(sessionStorage.getItem("datos"));

  // Se hace un for of del array obtenido del storage
  for (const prop of storage) {
    // Se le asigna un nuevo valor a la variable de gastosTotal y por dentro se le asigna un number
    gastosTotal += Number(prop.gastos);
  }

  $("#mostrar").val(gastosTotal);

  $("#mostrar").animate(
    {
      opacity: 0.7,
    },
    3000
  );

  $("#mostrar").addClass("input");
});

//creo un boton para ver cuanto tiene que pagar cada persona
let dividirGastos = document.createElement("button");
dividirGastos.textContent = "¿Cuanto paga cada uno?";
dividirGastos.setAttribute("class", "btn btn-secondary rounded-pill col-md-3");
dividirGastos.setAttribute("id", "btnDividir");

document.getElementById("botonGastosCadaUno").appendChild(dividirGastos);

//creo un input para que me muestro cuanto tiene que pagar cada persona
let gastosPorPersona = document.createElement("input");
gastosPorPersona.setAttribute("type", "number");
gastosPorPersona.setAttribute("class", "form-control rounded-pill");
gastosPorPersona.setAttribute("id", "mostrarGastosPorPersona");
gastosPorPersona.setAttribute("step", "0.01");

document.getElementById("mostrarGastosCadaUno").appendChild(gastosPorPersona);

//Botón para ver cuanto tiene que pagar cada uno
$("#btnDividir").click(function () {
  let storage2 = JSON.parse(sessionStorage.getItem("datos"));
  cantidadFinal = Number(storage2.length);

  gastosPersona = $("#mostrarGastosPorPersona").val(
    gastosTotal / cantidadFinal
  );

  $("#mostrarGastosPorPersona").animate(
    {
      opacity: 0.7,
    },
    3000
  );

  $("#mostrarGastosPorPersona").addClass("input");

  if ($("#mostrarGastosPorPersona").val() < 1000) {
    swal(
      "Que barata salió la juntada che!! Cada uno tiene que pagar $" +
        $("#mostrarGastosPorPersona").val()
    );
  } else {
    swal(
      "Apa!! Que rompimos?? Cada uno tiene que pagar $" +
        $("#mostrarGastosPorPersona").val()
    );
  }
});

//*************** INICIO SCRIPT PARA SECCIÓN "QUIEN  PAGA" ***************//

let totales_nombre = (n, nombre) => {
  $("#nombres").append(
    '<input type="text" class="form-control" id=' +
      "nombre-" +
      n +
      ' placeholder="Nombre" aria-label="First name">'
  );
  $("#nombre-" + n).val(nombre);
};

let nombresFinales = () => {
  let aPagarCadaUno = 0;
  for (i = 1; i <= cantidadFinal; i++) {
    if (
      parseFloat($("#gastos-" + i).val()) <
      parseFloat($("#mostrarGastosPorPersona").val())
    ) {
      aPagarCadaUno =
        parseFloat($("#mostrarGastosPorPersona").val()) -
        parseFloat($("#gastos-" + i).val());

      //A los inputs creados (ver boton debajo de este bloque) les paso el valor de los nombres y gastos introducidos por los usuarios
      $("#nombre--" + i).val($("#nombre-" + i).val());
      $("#nombre2--" + i).val("Paga :(");
      $("#gastos--" + i).val(aPagarCadaUno);
    } else if (
      parseFloat($("#gastos-" + i).val()) >
      parseFloat($("#mostrarGastosPorPersona").val())
    ) {
      $("#nombre--" + i).val($("#nombre-" + i).val());
      $("#nombre2--" + i).val("Cobra :)");
      $("#gastos--" + i).val(
        parseFloat($("#gastos-" + i).val()) -
          parseFloat($("#mostrarGastosPorPersona").val())
      );
    } else {
      $("#nombre--" + i).val($("#nombre-" + i).val());
      $("#nombre2--" + i).val("Estas hech@ ;)");
      $("#gastos--" + i).val(
        parseFloat($("#gastos-" + i).val()) -
          parseFloat($("#mostrarGastosPorPersona").val())
      );
    }
  }
};

//Con este botón creo la cantidad inputs de acuerdo a la cant. de personas
$("#btnQuienPaga").click(function () {
  $("#nombres").show(500, "swing");
  $("#nombres2").show(500, "swing");
  $("#gastos2").show(500, "swing");

  let storage2 = JSON.parse(sessionStorage.getItem("datos"));
  let cantidadFinal = Number(storage2.length);

  for (i = 1; i <= cantidadFinal; i++) {
    $("#nombres").append(
      '<input type="text" class="form-control rounded-pill" id=' +
        "nombre--" +
        i +
        '  aria-label="First name">'
    )[i];
    $("#nombres2").append(
      '<input type="text" class="form-control rounded-pill" id=' +
        "nombre2--" +
        i +
        ' aria-label="">'
    )[i];
    $("#gastos2").append(
      '<input type="number" class="form-control rounded-pill" id=' +
        "gastos--" +
        i +
        ' step="0.01" aria-label="Gastos">'
    )[i];
  }
  nombresFinales();
});

$(".btnArriba").click(function () {
  $("body, html").animate(
    {
      scrollTop: "0px",
    },
    100
  );
});

// })
