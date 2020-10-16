// element references
const loginForm = $('.loginForm')
const newAccountForm = $('.createAccountForm')
const usernameInput = $('#gitUserNameInput')
const userPasswordInput = $('#passwordInput')
const errorText = $('.formErrorText')
const loginDisplayBtn = $('.switchToLoginBtn')
const newAccountDisplayBtn = $('.switchToNewAccountBtn')
const newAccountHeading = $('.newAccountHeading')
const loginHeading = $('.loginHeading')

loginForm.on('submit', function(event) {
    event.preventDefault();

    // retrieve values from inputs for username and password
    const gitUsername = usernameInput.val();
    const userPassword = userPasswordInput.val();

    $.ajax({
        type: 'GET',
        url: '/login/' + gitUsername + '/' + userPassword,
        statusCode: {
            404: function(response) {
                errorText.text('Incorrect Password')
            },
            500: function(response) {
                errorText.text('Username does not exist')
            }
        }
    }).done(function(response) {
        console.log('success?')
        console.log(response)
        location.href = 'http://www.google.com'
        $('.formErrorText').text("Welcome Back!!!")
    })
});

newAccountForm.on('submit', function(event) {
    event.preventDefault();
    if (!checkPasswordMatch() || !$('#newPassword').val() || !$('#newPasswordReEnter').val()) {
        return alert('Passwords must match!')
    }

    const newUsername = $('#newGitUserNameInput').val();
    const newPassword = $('#newPassword').val();
    const userFName = $('#firstNameInput').val();
    const userLName = $('#lastNameInput').val();

    console.log(userFName);
    console.log(userLName)
    
    $.ajax({
        url: "/account/create",
        method: "POST",
        data: {
            gitUserName: newUsername,
            password: newPassword,
            first_name: userFName,
            last_name: userLName
        },
        statusCode: {
            500: function() {
                alert('Looks like someone else already has the username')
            }
        }
    }).done(function() {

    })
})

$('#newPasswordReEnter').on('keyup', function() {
    checkPasswordMatch();
})

loginDisplayBtn.on('click', function() {
    // hide elements of new account form
    newAccountHeading.css('display', 'none')
    newAccountForm.css('display', 'none')
    $(this).css('display', 'none')

    // show elements of login form
    loginForm.css('display', 'block')
    loginHeading.css('display', 'block')
    newAccountDisplayBtn.css('display', 'inline')

    $('.formErrorText').text('')
})

newAccountDisplayBtn.on('click', function() {
    // hide elements of new account form
    loginForm.css('display', 'none')
    loginHeading.css('display', 'none')
    $(this).css('display', 'none')

    // show elements of login form
    newAccountForm.css('display', 'block')
    newAccountHeading.css('display', 'block')
    loginDisplayBtn.css('display', 'inline')

    $('.formErrorText').text('')
})

function checkPasswordMatch() {
    if ($('#newPasswordReEnter').val() === $('#newPassword').val() && $('#newPasswordReEnter').val()) {
        $('.passwordMatchingText').text('Good to go!')
        return true
    } else {
        $('.passwordMatchingText').text("Passwords must match")
        return false
    }
}