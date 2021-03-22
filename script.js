// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const display = document.querySelector('.display');				

var table = document.getElementById("table");




display.value="Round 0"
var counter=0;

var arrHead = new Array();
arrHead = ['','INITIATIVE', 'NAME', 'HP']; // table headers.

    // first create a TABLE structure by adding few headers.
 
function createTable() {
        var empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable'); // table id.

        var thead = empTable.createTHead ()
        var tr = empTable.insertRow(-1);
	thead.appendChild(tr);
        
        for (var h = 0; h < arrHead.length; h++) {
	    var th = document.createElement('th'); // create table headers
	    if(h==0){//first colum
	        var button= document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Add New Row');
   		button.setAttribute('class', 'button');

                // add button's 'onclick' event.
                button.setAttribute('onclick', 'addRow()');

		th.appendChild(button);

	    }
		
            else {
            th.innerHTML = arrHead[h];
            
            }
	  tr.appendChild(th);
        }

        var div = document.getElementById('cont');
        div.appendChild(empTable);  // add the TABLE to the container.
	addRow();
    }

    // now, add a new to the TABLE.
    function addRow() {
        var empTab = document.getElementById('empTable');

        var rowCnt = empTab.rows.length;   // table row count.
        var tr = empTab.insertRow(-1); // the table row.
        //tr = empTab.insertRow(rowCnt);

        for (var c = 0; c < arrHead.length; c++) {
            var td = document.createElement('td'); // table definition.
            td = tr.insertCell(c);

            if (c == 0) {      // the first column.
                // add a button in every new row in the first column.
                var button = document.createElement('input');

                // set input attributes.
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Remove');
		button.setAttribute('class', 'button');

                // add button's 'onclick' event.
                button.setAttribute('onclick', 'removeRow(this)');

                td.appendChild(button);
            }
            else {
                // 2nd, 3rd and 4th column, will have textbox.
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', '');
		
		if(c == 1) {
			ele.setAttribute('oninput',"sortTable()");
		}

                td.appendChild(ele);
            }
	
        }
    	
    }


  // function to delete a row.
    function removeRow(oButton) {
        var empTab = document.getElementById('empTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
    }

function turn() {

  counter= counter + 1;
  display.value=("Round " + counter.toString());
	
}

function sortTable() {
 
 console.log("hola")
}
