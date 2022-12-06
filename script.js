const display = document.querySelector(".display");
class Row {
  constructor(init, name, hp, conditions, hasATurn, id) {
    this.init = init || 0;
    this.name = name || "";
    this.hp = hp || "";
    this.conditions = conditions || "";
    this.hasATurn = hasATurn || false;
    this.id = id || Date.now().toString(36);
  }

  render() {
    const { id } = this;
    const tBody = document.getElementById("tBody");
    const tRow = document.createElement("tr");

    // Change background if has a turn
    if (this.hasATurn) {
      tRow.setAttribute("class", "selected");
    }

    // Update the values if changed
    tRow.addEventListener("change", (event) => {
      this[event.target.name] = event.target.value;
      localStorage.setItem("table", JSON.stringify(rows));
    });

    // Table headers.
    const props = ["Remove", "init", "name", "hp", "conditions"];
    // Insert cells
    props.forEach((prop, index) => this._addCell(tRow, prop, index, id));

    tBody.appendChild(tRow);
  }

  _addCell(row, prop, cellIndex, rowId) {
    const cell = row.insertCell();
    const input = document.createElement("input");

    input.setAttribute("name", prop);
    input.setAttribute("value", this[prop]);
    input.setAttribute("type", "text");

    // first cell
    if (cellIndex === 0) {
      input.setAttribute("value", prop);
      input.setAttribute("type", "button");
      input.setAttribute("class", "button");
      // add button's 'onclick' event.
      input.setAttribute("onclick", `removeRow("${rowId}")`);
    }

    // second cell
    else if (cellIndex === 1) {
      input.setAttribute("type", "number");
      input.setAttribute("onBlur", "sortTable()");
      input.setAttribute("autocomplete", "off");
    }

    cell.appendChild(input);
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
  rows.forEach((row) => (row.hasATurn = false));
  round = 1;
  renderAll();
  updateRound();
}

function renderAll() {
  // TODO: Bad practice, this should be a different function
  // store first
  localStorage.setItem("table", JSON.stringify(rows));

  document.getElementById("tBody").innerHTML = "";
  rows.forEach((row) => {
    row.render();
    return;
  });
}
