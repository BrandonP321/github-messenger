// event listener for when user clicks on a group name in the groups list
$('.groupBtn').on('click', function() {
    // grab id for the group from data-id attribute
    const groupId = $(this).data('id')
    // grab stored id for group currently on display
    const currentlyDisplayedGroup = $('.messageBoardContainer').attr('data-currentGroupId')

    // if the clicked group is already on display, return here and leave page as is
    if (groupId == currentlyDisplayedGroup) {
        return false
    }
    // set the currenttly displayed group id
    $('.messageBoardContainer').attr('data-currentGroupId', groupId)
    
    // make request to get all info of the clicked group
    $.ajax({
        url: '/groups/messages/' + groupId,
        method: "GET"
    }).then(function(response) {
        // store values from response
        const groupMessages = response.messages;
        const groupMembers = response.group_members;
        const groupName = response.group_name;
        const groupType = response.group_type;
        // repo url can be null if not a git repo project channel
        const repoUrl = response.repo_url;

        // clear all messages and group info from page
        $('.messageBoardContainer').empty();

        // iteate through messages arr in reverse order (oldest to newest)
        for (let i = groupMessages.length - 1; i >= 0; i--) {
            let message = groupMessages[i]
            console.log(message)
            let newMessageDiv = $('<div>')
            newMessageDiv.text(message.message_body)
            newMessageDiv.attr('class', 'message')
            newMessageDiv.attr('data-ownerId', message.creator_id)

            // make sure to change 1 to the id of the logged in user
            if (message.creator_id === 1) {
                // add class letting css know that this message was made by the logged in user
                newMessageDiv.addClass('createdByUser')
            }

            console.log('appending')
            $('.messageBoardContainer').append(newMessageDiv)
        }
    })
})