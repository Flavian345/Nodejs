var menu = document.querySelector(".menu");
var link = document.querySelector("#navbar");

menu.addEventListener("click", () => {
    link.classList.toggle("active");
    dropclass.classList.remove("active4");
})




var drop = document.querySelector("#drop");
var dropclass = document.querySelector(".drop");



drop.addEventListener("click", () => {
    dropclass.classList.toggle("active4");
    link.classList.remove("active");
})





var btn_delete = document.querySelector('#delete');
var verifiko = document.querySelector('.verifiko');

btn_delete.addEventListener("click", () => {
    verifiko.classList.add("active7");
})


