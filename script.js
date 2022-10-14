const addNewCourseBtn = document.querySelector(".addNewCourseBtn");
const calculateGPABtn = document.querySelector(".calculateGPAbtn");
const deleteCourseBtns = document.querySelectorAll(".delete-course-btn");
const saveEditBtn = document.querySelector(".saveEditBtn");
const editGradeBtns = document.querySelectorAll(".edit-grade-btn");

/**
 * @param  { HTMLTableRowElement } sourceRow - row whose inputs are beind edited
 * @desc Makes sure that all other table row inputs that are not being currently edited are disabled and their isbeingedited data property is set to false.
 */
const disableOtherInputs = (sourceRow) => {
  const tableRows = document.querySelectorAll(".table-body .table-row"); // by putting tableRow inside the function, I am telling the browser to get a new list of all rows every time the function is called
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
  const tableRows = document.querySelectorAll(".table-body .table-row"); // by putting tableRow inside the function, I am telling the browser to get a new list of all rows every time the function is called
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
/**
 * @desc creates a new course row with its inputs
 */
const addNewCourse = () => {
  const tableBody = tableEl.querySelector(".table-body");
  let newRow = tableBody.insertRow(); // creates a new tr element and appends it to the end of the tbody
  newRow.classList.add("table-row", "course-row"); // adds the class "table-row" to the new row
  newRow.setAttribute("data-isBeingEdited", "false"); // adds the custom data attribute
  // Create 6 new td element children of the new row
  for (let rowAmount = 0; rowAmount < 6; rowAmount++) {
    newRow.insertCell(); // creates 6 new td elements. 6 is the number of cells each row has
  }

  // An array of array of all the different classes each child td element has
  let tableDataClasses = [
    ["table-data", "edit-data"],
    ["table-data", "serial-number"],
    ["table-data", "name-data"],
    ["table-data", "credit-data"],
    ["table-data", "grade-data"],
    ["table-data"],
  ];

  // An array of all the elements that will be added via innerHTML to each td element
  let tableDataContent = [
    "<button class='edit-grade-btn'><i class='fa-solid fa-pencil'>Edit</i></button>",
    "<input type='text' name='courseName' id='' disabled>",
    "<input type='number' name='courseCredit' id='' disabled>",
    "<input type='text' name='courseGrade' id=''' disabled>",
    "<button class='delete-course-btn'>X</button>",
  ];

  let newCells = newRow.querySelectorAll("td"); // Ge all the td elements created

  // Loop through each td element, get the index of each element and add the classes of that index that is set in tableDataClasses to the td element (cell)
  newCells.forEach((cell, index) => {
    tableDataClasses[index].forEach((className) => {
      cell.classList.add(className);
    });

    if (index === 0) {
      // if the present cell is the first element, then let its innerHTML be the element at the cells index of the tableDataContent array
      cell.innerHTML = tableDataContent[index];
    }

    if (index === 1) {
      // if the present cell is the second element, then ignore it. Its innerHTML value is set by the updateSerialNumber function called below
      return;
    }

    if (index > 1) {
      // if the present cell is neither the first or second cell, then let its innerHTML be the element at its index -1 of the tableDataContent array
      cell.innerHTML = tableDataContent[index - 1];
    }
  });

  updateSerialNumber(); // updates the serial number

  // Get the newly created edit button for the course and add the makeInputEditable function to it on click
  let editNewCourseBtn = newRow.querySelector(".edit-grade-btn");
  editNewCourseBtn.addEventListener("click", (ev) => {
    makeInputEditable(ev.target);
  });

  // Get the newly created delete button for the course and add the deleteCourse function to it on click
  let deleteNewCourseBtn = newRow.querySelector(".delete-course-btn");
  deleteNewCourseBtn.addEventListener("click", (ev) => {
    deleteCourse(ev.target);
  });
};
/**
 * @desc takes the inputs values and returns the computed course data, namely the creditUnits and the grades for calculation of the GPA
 * @returns coursesData - an Object of arrays for the creditUnits and grades
 */
const getCoursesData = () => {
  const courses = document.querySelectorAll(".course-row"); // gets all courses inputed
  let coursesData = {
    creditUnits: [], // initializes an empty array to store all the creditUnits
    grades: [], // initializes an empty array to store all the grades
  };
  courses.forEach((course) => {
    // for each course inputed
    let courseCredit = parseInt(
      course.querySelector("input[name='courseCredit']").value
    ); // get the value of the input with name 'courseCredit
    let courseLetterGrade = course.querySelector(
      "input[name='courseGrade']"
    ).value; // get the value of the input with name 'courseGrade'
    let courseGrade; // initializes a new variable to store the course grade
    switch (courseLetterGrade) {
      // if the value of the courseLetterGrade is 'A' or 'a' then let the courseGrade be 5
      case "A":
      case "a":
        courseGrade = 5;
        break;
      // if the value of the courseLetterGrade is 'B' or 'b' then let the courseGrade be 4 and so on...
      case "B":
      case "b":
        courseGrade = 4;
        break;
      case "C":
      case "c":
        courseGrade = 3;
        break;
      case "D":
      case "d":
        courseGrade = 2;
        break;
      case "E":
      case "e":
        courseGrade = 1;
        break;
      case "F":
      case "f":
        courseGrade = 0;
        break;

      default:
        break;
    }
    coursesData.grades.push(courseGrade); // add the courseGrade value of the course in the loop to the grades array of the coursesData object
    coursesData.creditUnits.push(courseCredit); // add the courseCredit value of the course in the loop to the creditUnits array of the coursesData object
  });

  return coursesData; // returns the coursesData object
};

/**
 * @desc Calculates the GPA from the coursesData object and outputs it to the HTML
 */
const calculateGPA = () => {
  const gpaResultContainer = document.querySelector(".gpa-results-container");
  const creditUnitResult = document.querySelector(".credit-unit-result");
  const qualityPointResult = document.querySelector(".quality-point-result");
  const gradePointResult = document.querySelector(".grade-point-result");

  let qualityPoints = []; // initializes an array to store all the quality points going to be calculated

  const { grades, creditUnits } = getCoursesData(); // deconstructs the grades and creditUnits arrays from the coursesData object and stores them to their own separate variables

  const totalGradePoints = grades.reduce(
    // adds up all the elements in the grades array and save it to the totalGradePoints variale
    (currentSum, nextValue) => currentSum + nextValue
  );

  const totalCreditUnits = creditUnits.reduce(
    // adds up all the elements in the creditUnits array and save it to the totalCreditUnits variable
    (currentSum, nextValue) => currentSum + nextValue
  );

  // calculate the quality point for each course by multiplying the courseGrade and its corresponding credit unit
  grades.forEach((courseGrade, index) => {
    let gradeQualityPoint = courseGrade * creditUnits[index];
    qualityPoints.push(gradeQualityPoint);
  });

  const totalQualityPoints = qualityPoints.reduce(
    // adds up all the elements in the qualityPoints array and save it to the totalQualityPoints variable
    (currentSum, nextValue) => currentSum + nextValue
  );

  const GPA = totalQualityPoints / totalCreditUnits; // gets the GPA by dividing the totalQualityPoints by the totalCreditUnits

  creditUnitResult.textContent = totalCreditUnits;
  qualityPointResult.textContent = totalQualityPoints;
  gradePointResult.textContent = GPA;

  gpaResultContainer.classList.remove("hide");
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

addNewCourseBtn.addEventListener("click", addNewCourse);

calculateGPABtn.addEventListener("click", calculateGPA);

// Disable all inputs when the page loads
window.addEventListener("load", () => {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.disabled = true;
  });
});
