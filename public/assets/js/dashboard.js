// event listener for when user clicks on a group name in the groups list
$('.groupBtn, .refreshBtn').on('click', function() {
    // grab id for the group from data-id attribute
    let groupId = $(this).data('id')
    // grab stored id for group currently on display
    const currentlyDisplayedGroup = $('.messageBoardContainer').attr('data-currentGroupId')

    // if the clicked group is already on display, return here and leave page as is
    if (groupId == currentlyDisplayedGroup && $(this).attr('class') !== 'refreshBtn') {
        return false
    }


    // temp code for refresh button
    if ($(this).attr('class') === 'refreshBtn') {
        groupId = $('.messageBoardContainer').attr('data-currentGroupId')
    }


    // set the currenttly displayed group id
    $('.messageBoardContainer').attr('data-currentGroupId', groupId)
    
    // make request to get all info of the clicked group
    $.ajax({
        url: '/groups/messages/' + groupId,
        method: "GET",
        beforeSend: function() {
            // show spinner while loading
            $('.refreshSpinner').css('display', 'inline-block')
        }
    }).then(function(response) {
        // hide spinner
        $('.refreshSpinner').css('display', 'none')

        // store values from response
        const groupMessages = response.messages;
        const groupMembers = response.group_members;
        const groupName = response.group_name;
        const groupType = response.group_type;
        // repo url can be null if not a git repo project channel
        const repoUrl = response.repo_url;

        // clear all messages and group info from page
        $('.messagesList').empty();

        // iteate through messages arr in reverse order (oldest to newest)
        for (let i = groupMessages.length - 1; i >= 0; i--) {
            let message = groupMessages[i]

            let newMessageDiv = $('<div>')
            newMessageDiv.text(message.message_body)
            newMessageDiv.attr('class', 'message')
            newMessageDiv.attr('data-ownerId', message.creator_id)

            // check if id of user who wrote message = id of logged in user
            if (message.creator_id == localStorage.getItem('user_id')) {
                // add class letting css know that this message was made by the logged in user
                newMessageDiv.addClass('createdByUser')
            }

            $('.messagesList').append(newMessageDiv)
        }
    })
})

// listener on message send button
$('.sendBtn').on('click', function() {
    const messageInput = $('.newMessageInput').val()

    // do nothing if user has not entered any input
    if (!messageInput) {
        return false
    }

    $.ajax({
        url: 'api/messages/new',
        method: "POST",
        data: {
            message_body: messageInput,
            user_id: localStorage.getItem('user_id'),
            group_id: $('.messageBoardContainer').attr('data-currentGroupId')
        }
    }).then(function(response) {
        console.log('message sent')
        $('.newMessageInput').val('')
        addMessageTextEle(messageInput, localStorage.getItem('user_id'))
    })
})

$('.addGroupBtn').on('click', function() {
    const groupType = $(this).attr('data-groupType')
    let modalTitle = $('#modalLabel')
    let modalBody = $('.modal-body')
    modalBody.empty();

    switch (groupType) {
        case 'channel':
            modalTitle.text("Enter the group's Github repo url")

            let urlInputEle = $('<input>')
            urlInputEle.attr('type', 'text')
            urlInputEle.attr('class', 'form-control repoUrlInput')
            modalBody.append(urlInputEle)

            $('.newGroupBtn').attr('data-groupType', 'channel')
            break;
        case 'groupChat':
            modalTitle.text('Select all users to start a group with')

            $('.newGroupBtn').attr('data-groupType', 'groupChat')
            break;
        case 'dm':
            modalTitle.text("Select the user you want to start a chat with")

            $('.newGroupBtn').attr('data-groupType', 'dm')
            break;
    }
})

$('.newGroupBtn').on('click', function() {

    switch ($(this).attr('data-groupType')) {
        case 'channel':
            // break repo url into chunks separated by a /
            const urlPartsArr = $('.repoUrlInput').val().split('/')
            // store repo name and owner in variables
            const repo_name = urlPartsArr[urlPartsArr.length-1]
            const repo_owner = urlPartsArr[urlPartsArr.length-2]
            console.log(repo_owner, repo_name)
            // make call to github api to retrieve repo info
            $.ajax({
                url: 'https://api.github.com/repos/' + repo_owner + '/' + repo_name + '/contributors',
                method: "GET"
            }).then(function(response) {
                console.log(response)
            })
            break;
        case 'groupChat':
            break;
        case 'dm':
            break;
    }
})

function addMessageTextEle(text, creator_id=null, creation_date=null) {
    const messageEle = $('<div>')
    messageEle.text(text)
    messageEle.attr('class', 'message ')
    messageEle.attr('data-ownerId', creator_id)

    // check if id of user who wrote message = id of logged in user
    if (creator_id == localStorage.getItem('user_id')) {
        // add class letting css know that this message was made by the logged in user
        messageEle.addClass('createdByUser')
    }

    $('.messagesList').prepend(messageEle)
}    

function updateMessagesScroll() {
    const scrollEle = document.getElementsByClassName('messagesList')
    scrollEle.scrollTop = scrollEle.scrollHeight;
}