// inputMask
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('(99) 999-99-99');
im.mask(inputs);

//let reg = /^\d{9}$/;
let reg = /^\(\d{2}\) \d{3}-\d{2}-\d{2}$/;
let reg2 = /^[a-zA-Z ]+$/;

let is_validate = {
    name: false,
    tel: false
}



document.querySelector('#username').onkeyup = function(){
    let obj = document.getElementById('username');

    if (reg2.test(obj.value)){
        document.getElementById("name_not_validated").style.display = 'none';
        is_validate.name = true;
        btn_active();
    }
    else {
        if (obj.value == ''){
            document.getElementById("name_not_validated").style.display = '';
            document.getElementById("name_not_validated").innerHTML = 'Пожалуйста, введите ваше имя и фамилию';
        }
        else {
            document.getElementById("name_not_validated").style.display = '';
            document.getElementById("name_not_validated").innerHTML = 'Пожалуйста, введите ваше имя и фамилию правильно';
        }
        is_validate.name = false;
        btn_active();
    }
}

document.querySelector('#tel').onkeyup = function(){
    let obj = document.getElementById('tel');

    if (reg.test(obj.value)){
        document.getElementById("tel_not_validated").style.display = 'none';
        is_validate.tel = true;
        btn_active();
    }
    else {
        document.getElementById("tel_not_validated").style.display = '';
        document.getElementById("tel_not_validated").innerHTML = 'Пожалуйста, введите номер телефона';
        is_validate.tel = false;
        btn_active();
    }
}

function btn_active(){
    btn = document.getElementById('send_code');
    if (is_validate.name && is_validate.tel){
        btn.classList.remove('disabled');
    }
    else{
        btn.classList.add('disabled');
    }
}



/*
document.querySelector('.reg_validation').onclick = function(){
    let obj = document.getElementById('tel');

    if (reg.test(obj.value)){
        document.getElementById("not_validated").style.display = 'none';
    }
    else {
        document.getElementById("not_validated").style.display = '';
        document.getElementById("not_validated").innerHTML = 'Пожалуйста, введите номер телефона';
    }
}*/

// validate
/*
function validateForms(selector, rules) {
    new window.JustValidate(selector, {
        rules: rules,
        submitHandler: function (form, values, ajax) {
            console.log(form);

            let formData = new FormData(form);

            console.log(formData);
*/
            /*

            fetch("mail.php", {
                method: "POST",
                body: formData
            })
            .then(function(data) {
                console.log(data);
                console.log('Отправлено');
                form.reset();
            });*/
/*        }
    });
}*/
/*
validateForms('.form', { fio: { required: true }, tel: { required: true } });*/