(() => {
    // Get elements.
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#confirm-password');
    const passwordMeterBar = document.querySelector('.password-meter-bar');
    const passwordMeterText = document.querySelector('.password-meter-text');
    const passwordInfo = document.querySelector('.box-input.password .input-info');
    const passwordConfirmInfo = document.querySelector('.box-input.confirm-password .input-info');

    // Get rules items text
    const minLengthText = document.querySelector('.item-least-characters');
    const digitsText = document.querySelector('.item-digit');
    const upperCasesText = document.querySelector('.item-uppercase');
    const lowerCasesText = document.querySelector('.item-lowercase');
    const specialCharactersText = document.querySelector('.item-special-character');
    const spacesText = document.querySelector('.item-spaces');
    // const userIdText = document.querySelector('.item-user-id');

    //RegExp patterns and restrictions
    const minLengthRegExp = 8;
    const digitsRegExp = /[0-9]/;
    const upperCasesRegExp = /[A-Z]/;
    const lowerCasesRegExp = /[a-z]/;
    const specialCharactersRegExp = /[\W]/; // TODO Fix Bug => Space
    // const specialCharactersRegExp =
    // /[(\~\!\@\#\$\%\^\&\*\(\)\_\+\=\{\}\[\]\"\'\:\;\?\/\\\|\<\>\,\.)]/;
    const spacesRegExp = /[\s]/;

    const validColor = '#4ca192';
    const invalidColor = '#f63362';

    // Set color and icon and font-weight
    let handleValidationRules = (status, element) => {
        if (status === 'valid') {
            element.style.color = validColor;
            element.style.fontWeight = 'bolder';
            element.querySelector('i').classList.remove('fa-times');
            element.querySelector('i').classList.add('fa-check');

        } else if (status === 'invalid') {
            element.style.color = invalidColor;
            element.style.fontWeight = 'normal';
            element.querySelector('i').classList.remove('fa-check');
            element.querySelector('i').classList.add('fa-times');
        }
    };

    // check valid or invalid rules
    let handleCheckRules = (password) => {
        let score = 0;

        if (password.length >= minLengthRegExp) {
            handleValidationRules('valid', minLengthText);
            score += 20;
        } else {
            handleValidationRules('invalid', minLengthText);
        }

        if (password.match(digitsRegExp)) {
            handleValidationRules('valid', digitsText);
            score += 20;
        } else {
            handleValidationRules('invalid', digitsText);
        }

        if (password.match(upperCasesRegExp)) {
            handleValidationRules('valid', upperCasesText);
            score += 20;
        } else {
            handleValidationRules('invalid', upperCasesText);
        }

        if (password.match(lowerCasesRegExp)) {
            handleValidationRules('valid', lowerCasesText);
            score += 20;
        } else {
            handleValidationRules('invalid', lowerCasesText);
        }

        if (password.match(specialCharactersRegExp)) {
            handleValidationRules('valid', specialCharactersText);
            score += 20;
        } else {
            handleValidationRules('invalid', specialCharactersText);
        }

        if (!password.match(spacesRegExp)) {
            handleValidationRules('valid', spacesText);
        } else {
            handleValidationRules('invalid', spacesText);
        }

        return score;
    };

    // handle calculate score
    let handleScore = (score) => {
        let strengthColor = {
            0: '#ebe8ed',
            1: '#eb4d4b',
            2: '#f63362',
            3: '#fbc531',
            4: '#f39c12',
            5: '#4ca192',
        };

        let strengthText = {
            0: 'invalid',
            1: 'bad',
            2: 'Poor',
            3: 'Weak',
            4: 'Good',
            5: 'Strong',
        };

        switch (score) {
            case 20:
                handlePasswordMeter(
                    '20%',
                    strengthColor[1],
                    strengthText[1],
                    'invalid'
                );

                break;
            case 40:
                handlePasswordMeter(
                    '40%',
                    strengthColor[2],
                    strengthText[2],
                    'invalid'
                );

                break;
            case 60:
                handlePasswordMeter(
                    '60%',
                    strengthColor[3],
                    strengthText[3],
                    'invalid'
                );

                break;
            case 80:
                handlePasswordMeter(
                    '80%',
                    strengthColor[4],
                    strengthText[4],
                    'invalid'
                );

                break;
            case 100:
                handlePasswordMeter(
                    '100%',
                    strengthColor[5],
                    strengthText[5],
                    'valid'
                );
                break;
            default:
                handlePasswordMeter(
                    '0%',
                    strengthColor[1],
                    strengthText[0],
                    'invalid'
                );
                break;
        }
    };

    // Set style password meter
    let handlePasswordMeter = (width, color, text, status) => {
        passwordMeterBar.style.width = width;
        passwordMeterBar.style.backgroundColor = color;
        passwordMeterText.style.color = color;
        passwordMeterText.innerText = text;

        if (status === 'valid') {
            handleValidationInput(
                password,
                validColor,
                passwordInfo,
                'Valid password',
                validColor
            );
        } else if (status === 'invalid') {
            handleValidationInput(
                password,
                invalidColor,
                passwordInfo,
                'Please enter a valid password',
                invalidColor
            );
        }
    };

    // Set style input and info
    let handleValidationInput = (input, borderColor, elementInputInfo, text, textColor) => {
        input.style.borderColor = borderColor;
        elementInputInfo.style.color = textColor;
        elementInputInfo.innerText = text;
    };

    // Handle show password
    (() => {
        document.querySelector('.password-status span.fa-eye')
            .addEventListener('click', (e) => {
            e.target.classList.toggle('fa-eye-slash');
            if (password.type === 'password' && passwordConfirm.type === 'password') {
                password.type = 'text';
                passwordConfirm.type = 'text';
            } else {
                password.type = 'password';
                passwordConfirm.type = 'password';
            }
        });
    })();

    // Handle check matched password
    let handleCheckMatchedPassword = () => {
        if (passwordConfirm.value === password.value) {
            handleValidationInput(
                passwordConfirm,
                validColor,
                passwordConfirmInfo,
                'Matched Password',
                validColor
            );
        } else {
            handleValidationInput(
                passwordConfirm,
                invalidColor,
                passwordConfirmInfo,
                'Not Matched Password',
                invalidColor
            );
        }
    };

    window.addEventListener('DOMContentLoaded', () => {
        // Listening for updates to password field.
        password.addEventListener('input', (e) => {
            handleScore(handleCheckRules(e.target.value));
            handleCheckMatchedPassword();
        });

        // Listening is matches confirm password with the password field
        passwordConfirm.addEventListener('input', handleCheckMatchedPassword);
    });
})();