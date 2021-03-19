// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const display = document.querySelector('.display');

var table = document.getElementById("table");

display.value="hola"

function sortTable() {

  if (display.value==="hola") {
	display.value="adios"
	}
  else{
	
   display.value="hola"

  }

}