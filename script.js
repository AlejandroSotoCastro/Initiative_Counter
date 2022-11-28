// select the <input type="text" class="display" disabled> element
const display = document.querySelector(".display");

var table = document.getElementById("table");

// table headers.
props = ["", "INITIATIVE", "NAME", "HP", "CONDITIONS"];

// first create a TABLE structure by adding few headers.

class Row {
  constructor(init, name, hp, conditions, hasATurn) {
    this.init = init || 0;
    this.name = name || "";
    this.hp = hp || "";
    this.conditions = conditions || "";
    this.hasATurn = hasATurn || false;
    this.id = Date.now().toString(36);
  }

  render() {
    const tBody = document.getElementById("tBody");
    const { id } = this;

    // try each rows renders itself, the event is attached to the row
    // render returns the row and its appended in the foreach (onload)

    const trow = document.createElement("tr");
    if (this.hasATurn) {
      trow.style.backgroundColor = "#78c986";
    }

    trow.addEventListener("change", (event) => {
      this[event.target.name] = event.target.value;
      localStorage.setItem("table", JSON.stringify(rows));
    });
    //first cell
    const td1 = trow.insertCell();
    const button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Remove");
    button.setAttribute("name", "Remove");
    button.setAttribute("class", "button");
    // add button's 'onclick' event.
    button.setAttribute("onclick", `removeRow("${id}")`);
    td1.appendChild(button);

    //second cell
    const td2 = trow.insertCell();
    let ele = document.createElement("input");

    ele.setAttribute("name", "init");

    ele.setAttribute("type", "number");
    ele.setAttribute("onBlur", "sortTable()");
    ele.setAttribute("id", "init");
    ele.setAttribute("autocomplete", "off");
    ele.setAttribute("value", this.init);

    td2.appendChild(ele);
    //third cell
    const td3 = trow.insertCell();

    let ele3 = document.createElement("input");
    ele3.setAttribute("name", "name");

    ele3.setAttribute("type", "text");
    ele3.setAttribute("value", this.name);
    td3.appendChild(ele3);

    //fourth cell
    const td4 = trow.insertCell();

    let ele4 = document.createElement("input");
    ele4.setAttribute("name", "hp");

    ele4.setAttribute("type", "text");
    ele4.setAttribute("value", this.hp);
    td4.appendChild(ele4);

    //fifth cell
    const td5 = trow.insertCell();

    let ele5 = document.createElement("input");
    ele5.setAttribute("name", "conditions");

    ele5.setAttribute("type", "text");
    ele5.setAttribute("value", this.conditions);
    td5.appendChild(ele5);
    tBody.appendChild(trow);
  }
}

let rows = [];
let round = 1;

function createTable() {
  const storedRound = localStorage.getItem("round");
  if (storedRound) round = Number(localStorage.getItem("round"));
  updateRound();

  const storedTable = localStorage.getItem("table");
  if (storedTable) {
    table = JSON.parse(storedTable);

    rows = table.map((row) => {
      console.log(...Object.values(row));
      return new Row(...Object.values(row));
    });
    renderAll();
    return;
  }
  addRow();
  renderAll();
}
function addRow() {
  rows.push(new Row());
  console.log(rows);
  renderAll();
}

function removeRow(rowId) {
  rows = rows.filter(function (row) {
    return row.id !== rowId;
  });
  renderAll();
}

function sortTable() {
  rows.sort((a, b) => b.init - a.init);
  renderAll();
}

function advanceTurn() {
  const lastTurnIndex = rows.findIndex((row) => row.hasATurn);
  const isLast = lastTurnIndex >= rows.length - 1;

  // deal with edge case (none hasATurn )
  if (lastTurnIndex < 0) {
    rows[0].hasATurn = true;
    renderAll();

    return;
  }
  // remove previous hasATurn if any
  rows[lastTurnIndex].hasATurn = false;

  // deal with edge case (last of the table)
  if (isLast) {
    rows[0].hasATurn = true;
    round++;

    updateRound();
    renderAll();

    return;
  }
  // advance the turn
  rows[lastTurnIndex + 1].hasATurn = true;
  renderAll();
}

function updateRound() {
  localStorage.setItem("round", round);
  display.value = "Round " + round.toString();
}

function reset() {
  // turn = 0;
  //loop over rows and remove hasAturn
  round = 1;
  updateRound();
}

function renderAll() {
  document.getElementById("tBody").innerHTML = "";
  rows.forEach((row) => {
    row.render();
    return;
  });
}

// function createTable() {

//   var empTable = document.createElement("table");
//   empTable.setAttribute("id", "empTable"); // table id.
//   empTable.setAttribute("class", "fixed_headers");
//   var thead = empTable.createTHead();
//   var tr = empTable.insertRow(-1);
//   thead.appendChild(tr);

//   for (var h = 0; h < arrHead.length; h++) {
//     var th = document.createElement("th"); // create table headers
//     if (h == 0) {
//       //first colum
//       var button = document.createElement("input");
//       button.setAttribute("type", "button");
//       button.setAttribute("value", "Add New Row");
//       button.setAttribute("class", "button");

//       // add button's 'onclick' event.
//       button.setAttribute("onclick", "addRow()");

//       th.appendChild(button);
//     } else {
//       th.innerHTML = arrHead[h];
//     }
//     tr.appendChild(th);
//   }
//   var div = document.getElementById("cont");
//   div.appendChild(empTable); // add the TABLE to the container.
//   addRow();
// }

// now, add a new row to the TABLE.
// function addRow() {
//   var empTab = document.getElementById("empTable");

//   var rowCnt = empTab.rows.length; // table row count.
//   var tr = empTab.insertRow(-1); // the table row inserted at the end.
//   var tbody = empTab.getElementsByTagName("tbody")[0];
//   tbody.appendChild(tr);
//   //tr = empTab.insertRow(rowCnt);

//   for (var c = 0; c < arrHead.length; c++) {
//     var td = document.createElement("td"); // table definition.
//     td = tr.insertCell(c);

//     if (c == 0) {
//       // the first column.
//       // add a button in every new row in the first column.
//       var button = document.createElement("input");

//       // set input attributes.
//       button.setAttribute("type", "button");
//       button.setAttribute("value", "Remove");
//       button.setAttribute("class", "button");

//       // add button's 'onclick' event.
//       button.setAttribute("onclick", "removeRow(this)");

//       td.appendChild(button);
//     } else {
//       // 2nd, 3rd and 4th column, will have textbox.
//       var ele = document.createElement("input");
//       ele.setAttribute("type", "text");
//       ele.setAttribute("value", "");

//       if (c == 1) {
//         ele.setAttribute("onBlur", "sortTable()");
//         ele.setAttribute("id", "init");
//         ele.setAttribute("type", "number");
//         ele.setAttribute("autocomplete", "off");
//         ele.setAttribute("value", "0");
//       }

//       td.appendChild(ele);
//     }
//   }
// }

// function to delete a row.
function removeRowOld(oButton) {
  var empTab = document.getElementById("empTable");
  var thisRow = oButton.parentNode.parentNode.rowIndex;
  console.log("Before delete row " + thisRow + " on turn " + (turn_counter - 1) + " tblsize " + (empTab.rows.length - 1));

  if (thisRow < turn_counter - 1) {
    turn_counter -= 1;
    console.log("a row before turn was deleted ");
  } else if (thisRow === turn_counter - 1) {
    if (thisRow != empTab.rows.length - 1) {
      console.log("last row turn deleted");
      turnOld();
      turn_counter -= 1;
    } else if (thisRow === 1) {
      console.log("first row deleted");
    } else {
      turnOld();
      console.log(turn_counter);
    }

    console.log("Current turn row was deleted " + oButton.parentNode.parentNode.rowIndex);
  }

  empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
}

function turnOld() {
  var rows = getRows();
  for (i = 1; i < rows.length; i++) {
    rows[i].style.backgroundColor = "#f4f7f8";
  }
  if (rows.length === turn_counter) {
    turn_counter = 1;
    round_counter = round_counter + 1;
  }
  rows[turn_counter].style.backgroundColor = "#78c986";
  turn_counter += 1;
  display.value = "Round " + round_counter.toString();
}

// function sortTable() {
//   var table, i, x, y;
//   table = document.getElementById("empTable");
//   var switching = true;

//   // Run loop until no switching is needed
//   while (switching) {
//     switching = false;
//     var rows = table.rows;

//     // Loop to go through all rows
//     for (i = 1; i < rows.length - 1; i++) {
//       var Switch = false;

//       // Fetch 2 elements that need to be compared
//       x = rows[i].cells[1].children[0].value;
//       y = rows[i + 1].cells[1].children[0].value;

//       // Check if 2 rows need to be switched
//       if (parseInt(x) < parseInt(y)) {
//         console.log(x, y);
//         // If yes, mark Switch as needed and break loop
//         Switch = true;
//         break;
//       }
//     }
//     if (Switch) {
//       // Function to switch rows and mark switch as completed
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//     }
//   }
// }

function resetOld() {
  // If turn_counter is 1 it will reset the header
  if (turn_counter === 1) return;
  display.value = "Round 1";
  var rows = getRows();
  rows[turn_counter - 1].style.backgroundColor = "#f4f7f8";
  round_counter = 1;
  turn_counter = 1;
}

function getRows() {
  const table = document.getElementById("empTable");
  const rows = table.rows;
  return rows;
}
