add= document.getElementById('add')
calc= document.getElementById('calc')
remove= document.getElementById('remove')


//Delete button
var rem = document.getElementById('remove')
var div = document.getElementById('example2')
rem.addEventListener('click', function() {
    //div.removeChild(div.lastChild)
    div.parentNode.removeChild(div)
})

