const mobileMenu = () => {
    document.querySelector('.main-nav').classList.toggle('mobile');
}

for (let item of document.getElementsByTagName('a')) {
    item.addEventListener('click', function () {
        if (document.querySelector('.main-nav').classList.contains('mobile')) {
            document.querySelector('.main-nav').classList.remove('mobile')
        }
    })
};
const formValidation = (e) => {
    e.preventDefault()
    let flag = false;
    let appointment = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('select-service').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value,
    }
    for (i = 0; document.querySelectorAll('.form-input')[i]; i++) {
        if (document.querySelectorAll('.form-input')[i].value === "" | document.querySelectorAll('.form-input')[i].value === "SELECT SERVICE") {
            document.querySelectorAll('.form-input')[i].classList.add('error')
            flag = false;
        } else {
            document.querySelectorAll('.form-input')[i].classList.remove('error')
            flag = true;
        }
    }
    if (flag) {
        fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(resJSON => {
                console.log(resJSON);
                document.querySelector('.error-message').classList.remove('error');
                document.querySelector('.error-message').classList.add('send');
                document.querySelector('.error-message').innerHTML = `Thank you ${resJSON.appointment.name} for making an appointemnt.`
            })
    } else {
        document.querySelector('.error-message').classList.add('error');
        document.querySelector('.error-message').innerHTML = 'Fill required fileds'
    }
}

document.querySelector('.mobile-open').addEventListener('click', mobileMenu);
document.querySelector('.mobile-close').addEventListener('click', mobileMenu);

document.getElementById('get-reservation').addEventListener('submit', formValidation)
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
})