// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const display = document.querySelector('.display');

var table = document.getElementById("table");

display.value="Round 0"
var counter=0;

function sortTable() {

  counter= counter + 1;
  display.value=("Round " + counter.toString());
	
 
  

}