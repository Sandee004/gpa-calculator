var add= document.getElementById('add')
var calc= document.getElementById('calc')
var remove= document.getElementById('remove')
var tableEl = document.querySelector('table')

//Variabe for the numbering
var x= 2

//Variables for add button
var new_row = tableEl.insertRow(tableEl.rows.length)

    var cel1 = new_row.insertCell(0);
    var cel2 = new_row.insertCell(1);
    var cel3 = new_row.insertCell(2);
    var cel4 = new_row.insertCell(3);


//Function for the add button
add.addEventListener('click', function() {
    var new_row = tableEl.insertRow(tableEl.rows.length)

    var cel1 = new_row.insertCell(0);
    var cel2 = new_row.insertCell(1);
    var cel3 = new_row.insertCell(2);
    var cel4 = new_row.insertCell(3);

    cel1.innerHTML = x++
    cel2.innerHTML = '<input class="course" style="width: 150px; border: none;; background: transparent; text-align: center; font-size: 18px; border-bottom: 1px solid black">'
    cel3.innerHTML = '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">'
    cel4.innerHTML = '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">'

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
    var values = document.getElementById('unit').value
    var cel3_val = document.querySelector('.unit').value|0
    alert(values + cel3_val)
})
