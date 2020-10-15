// element references
const loginForm = $('.loginForm')
const usernameInput = $('#gitUserNameInput')
const userPasswordInput = $('#passwordInput')


loginForm.on('submit', function(event) {
    event.preventDefault();

    // retrieve values from inputs for username and password
    const gitUsername = usernameInput.val();
    const userPassword = userPasswordInput.val();

    $.ajax({
        type: 'GET',
        url: '/api/login/' + gitUsername + '/' + userPassword,
        statusCode: {
            404: function(response) {
                console.log('Incorrect password')
            },
            500: function(response) {
                console.log('username does not exist')
            }
        }
    }).done(function(response) {
        console.log('success?')
        console.log(response)
    }).fail(function(){
        console.log('oops')
    })
})
