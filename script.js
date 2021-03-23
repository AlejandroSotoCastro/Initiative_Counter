// select all the buttons
const buttons = document.querySelectorAll('button');
// select the <input type="text" class="display" disabled> element
const display = document.querySelector('.display');				

var table = document.getElementById("table");




display.value="Round 1"
var round_counter=1;
var turn_counter=1;

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
			ele.setAttribute('onBlur',"sortTable()");
			ele.setAttribute('id',"init");
			ele.setAttribute('type', 'number');
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

  
  var table = document.getElementById("empTable"); 
  var rows = table.rows;
   for (i = 1; i < (rows.length ); i++) { 

	rows[i].style.backgroundColor= "#f4f7f8";
   }
   if(rows.length===turn_counter){
   turn_counter=1;
   round_counter= round_counter + 1;
   rows[turn_counter].style.backgroundColor= "#78c986";
   console.log("reset")
   }
   else{
    rows[turn_counter].style.backgroundColor= "#78c986";
    
    console.log("normal")  
   }
  turn_counter+=1; 
  display.value=("Round " + round_counter.toString());

}



function sortTable() { 
                var table, i, x, y; 
                table = document.getElementById("empTable"); 
                var switching = true; 
  
                // Run loop until no switching is needed 
                while (switching) { 
                    switching = false; 
                    var rows = table.rows; 
  
                    // Loop to go through all rows 
                    for (i = 1; i < (rows.length - 1); i++) { 
                        var Switch = false; 
  
                        // Fetch 2 elements that need to be compared 
			x = rows[i].cells[1].children[0].value;
                        y = rows[i+1].cells[1].children[0].value;
  
                        // Check if 2 rows need to be switched 
                        if (parseInt(x) <parseInt(y) ) 
                            { 
  			    
  				console.log(x,y);
                            // If yes, mark Switch as needed and break loop 
                            Switch = true; 
                            break; 
                        } 
                    } 
                    if (Switch) { 
                        // Function to switch rows and mark switch as completed 
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                        switching = true; 
                    } 
                } 
            } 


     
