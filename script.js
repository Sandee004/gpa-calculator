const addNewCourseBtn = document.querySelector(".addNewCourseBtn");
const calculateGPABtn = document.querySelector(".calculateGPAbtn");
const deleteCourseBtns = document.querySelectorAll(".delete-course-btn");
const saveEditBtn = document.querySelector(".saveEditBtn");
const editGradeBtns = document.querySelectorAll(".edit-grade-btn");
const tableRows = document.querySelectorAll(".table-body .table-row");

/**
 * @param  { HTMLTableRowElement } sourceRow - row whose inputs are beind edited
 * @desc Makes sure that all other table row inputs that are not being currently edited are disabled and their isbeingedited data property is set to false.
 */
const disableOtherInputs = (sourceRow) => {
  tableRows.forEach((row) => {
    if (row !== sourceRow) {
      // if the row in the loop is not the sourceRow
      row.querySelectorAll("input").forEach((input) => {
        // get all child inputs of rows that are not being edited
        input.disabled = true;
      });
      row.dataset.isbeingedited = "false"; // sets the isbeingedited attribute to false
    }
  });
};

const tableEl = document.querySelector("table");
/**
 * @param  { HTMLButtonElement } ev - event target
 * @desc makes all the input in the button parent row editable and sets the parent row isbeingedited property to true
 */
const makeInputEditable = (ev) => {
  let btn = ev; // get the button that fired the event
  let parentRow = btn.closest(".table-row"); // get the button's parent row

  disableOtherInputs(parentRow);
  let inputsAreBeingEdited = parentRow.dataset.isbeingedited; // see if the element is being edited or not through our data attribute in the HTML
  let rowInputs = parentRow.querySelectorAll("input"); // get all the inputs in the row gotten from parentRow
  rowInputs.forEach((input) => {
    input.disabled = false; // makes all disabled inputs enabled and editable
  });
  if (inputsAreBeingEdited === "false") {
    parentRow.dataset.isbeingedited = "true"; // sets the custom data attribute to the opposite value. WARNING!!! "true" and "false" are of type string and are NOT booleans.
  } else {
    parentRow.dataset.isbeingedited = "false"; // sets the custom data attribute to the opposite value. WARNING!!! "true" and "false" are of type string and are NOT booleans.
  }
};

/**
 * @desc Finishes editing of inputs by making all previously enabled inputs disabled.
 */
const finishEditing = () => {
  tableRows.forEach((row) => {
    if (row.dataset.isbeingedited === "true") {
      row.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
      });
      row.dataset.isbeingedited = "false";
    }
  });
};
/**
 * @param  { HTMLButtonElement } ev  - event target
 * @desc delete the parent row of the btn clicked and update the serial numbers of other rows accordingly
 */
const deleteCourse = (ev) => {
  let deleteBtn = ev;
  let parentRow = deleteBtn.closest(".table-row");
  let tbody = document.querySelector("tbody");
  tbody.removeChild(parentRow);
  updateSerialNumber();
};
/**
 * @desc updates the serial number of all the table data elements with class "serial-number"
 */
const updateSerialNumber = () => {
  let serialNumber = document.querySelectorAll(".serial-number"); // Gets all the table data elements with class "serial-number"
  let numberOfSerialNumberElements = serialNumber.length; // gets how many serialNumber elements exist in the DOM
  for (let index = 0; index < numberOfSerialNumberElements; index++) {
    serialNumber[index].textContent = index + 1; // Updates the textContent of each serialNumber based on its index in the DOM
  }
};

editGradeBtns.forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    makeInputEditable(ev.target);
  });
});

deleteCourseBtns.forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    deleteCourse(ev.target);
  });
});

saveEditBtn.addEventListener("click", (ev) => {
  finishEditing(ev);
});

// Disable all inputs when the page loads
window.addEventListener("load", () => {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.disabled = true;
  });
});
/* //Variabe for the numbering
var x = 2;

//Variables for add button
var new_row = tableEl.insertRow(tableEl.rows.length);

var cel1 = new_row.insertCell(0);
var cel2 = new_row.insertCell(1);
var cel3 = new_row.insertCell(2);
var cel4 = new_row.insertCell(3);

//Function for the add button
add.addEventListener("click", function () {
  var new_row = tableEl.insertRow(tableEl.rows.length);

  var cel1 = new_row.insertCell(0);
  var cel2 = new_row.insertCell(1);
  var cel3 = new_row.insertCell(2);
  var cel4 = new_row.insertCell(3);

  cel1.innerHTML = x++;
  cel2.innerHTML =
    '<input class="course" style="width: 150px; border: none;; background: transparent; text-align: center; font-size: 18px; border-bottom: 1px solid black">';
  cel3.innerHTML =
    '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">';
  cel4.innerHTML =
    '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">';

  cel2.setAttribute("class", "course");
  cel3.setAttribute("class", "unit");
  cel4.setAttribute("class", "grade");
});

//Function for the delete button
var div = document.getElementById("set");
remove.addEventListener("click", function () {
  div.removeChild(div.lastChild);
});

//Function for the calculations
calc.addEventListener("click", function () {
  var values = document.getElementById("unit").value;
  var cel3_val = document.querySelector(".unit").value | 0;
  alert(values + cel3_val);
}); */
