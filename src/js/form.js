

const form = document.getElementById('formName');
form.addEventListener('submit', function(evt){

    evt.preventDefault();

    const firstnameInput = document.querySelector("#formName input[name=firstname]");
    alert("Hello " + firstnameInput.value);

});