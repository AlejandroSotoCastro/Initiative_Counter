// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const display = document.querySelector('.display');

var table = document.getElementById("table");




display.value="Round 0"
var counter=0;

var arrHead = new Array();
arrHead = ['INITIATIVE', 'NAME', 'PATATA']; // table headers.

    // first create a TABLE structure by adding few headers.
    function createTable() {
        var empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable');  // table id.
	
	var thead = document.createElement('thead')
        var tr = empTable.insertRow(-1);
	//thead.appendChild(tr);

        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th'); // the header object.
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }

        var div = document.getElementById('cont');
        div.appendChild(empTable);    // add table to a container.
    }



function sortTable() {

  counter= counter + 1;
  display.value=("Round " + counter.toString());
	
}