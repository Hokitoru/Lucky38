function onClick(e) {
    e.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute('6LeY4-YgAAAAAAsD9pjcobRkGEw4RkcwoJtz0Fjl', {action: 'submit'}).then(function(token) {
            // Add your logic to submit to your backend server here.
        });
    });
}

const onClickBtn = document.querySelector('.test');

onClickBtn.addEventListener('click', onClick);
