var add= document.getElementById('add')
var calc= document.getElementById('calc')
var remove= document.getElementById('remove')
var tableEl = document.querySelector('table')


//Function for the add button
add.addEventListener('click', function() {
    var new_row = tableEl.insertRow(tableEl.rows.length)
    new_row.setAttribute('class', 'one')

    var cel1 = new_row.insertCell(0);
    var cel2 = new_row.insertCell(1);
    var cel3 = new_row.insertCell(2);
    var cel4 = new_row.insertCell(3);

    cel1.innerHTML = document.getElementsByClassName("one").length
    cel2.innerHTML = '<input class="course" style="width: 150px; border: none;; background: transparent; text-align: center; font-size: 18px; border-bottom: 1px solid black">'
    cel3.innerHTML = '<input id="testt" type="number" style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">'
    cel4.innerHTML = '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">'

    cel1.setAttribute('class', 'no')
    cel2.setAttribute('class', 'course')
    cel3.setAttribute('class', 'unit')
    cel4.setAttribute('class', 'grade')
})


//Function for the delete button
var div = document.getElementById('set')
remove.addEventListener('click', function() {
    div.removeChild(div.lastChild)
})

//Function for the calculations
calc.addEventListener('click', function() {
    var values = parseInt(document.getElementById('unit').value |0)
    var cel3_val = parseInt(document.getElementById("testt").value|0)
    //var cel4_val = parseInt(document.querySelectorAll(".testt").value|0)
    alert(values+cel3_val)
})

//Getting the numbering
/*const serial_number = () => {
    let numbering = document.getElementsByClassName(".no")
    let numberColumn = numbering.length
    for (let index = 0; index < numberColumn; index++) {
    numbering[index].textContent = index + 1; // Updates the textContent of each serialNumber based on its index in the DOM
  }
}*/
