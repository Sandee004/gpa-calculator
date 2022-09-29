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

    cel1.innerHTML = x++
    cel2.innerHTML = '<input style="width: 150px; border: none;; background: transparent; text-align: center; font-size: 18px; border-bottom: 1px solid black">'
    cel3.innerHTML = '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">'
    cel4.innerHTML = '<input style="width: 30px; font-size: 18px; text-align: center; background: transparent; border: none; border-bottom: 1px solid black">'
})


//Function for the delete button

//Function for the calculations

//calc.addEventListener('click', function() {
//var check = document.querySelector('table'), sumVal = 0
//for (var i = 1; i< check.rows.length; i++) {
  //  sumVal = sumVal + parseInt(check.rows[i].cells[2].value)
//}
///alert(sumVal)
//})



  //  value= document.getElementById('unit').value
    //value2= new_row.cel3.value
    //alert(value2)






//rem.addEventListener('click', function() {
    //div.removeChild(div.lastChild)
    //div.parentNode.removeChild(div)

