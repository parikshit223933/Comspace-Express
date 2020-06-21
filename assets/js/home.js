let add_click_action_to_like_button = function ()
{
    for (let like_button of $('.like-buttons'))
    {
        let button = $(like_button);
        button.click(function (event)
        {
            event.preventDefault();
            $.ajax(
                {
                    type: 'GET',
                    url: button.attr('href')
                }
            )
                .done(function (data)
                {
                    let likes_count = button.attr('data-likes');
                    console.log(likes_count);
                    if (data.data.deleted)
                    {
                        likes_count = parseInt(likes_count) - 1;
                    }
                    else
                    {
                        likes_count = parseInt(likes_count) + 1;
                    }
                    button.attr('data-likes', likes_count);
                    button.find('span').html(likes_count);
                })
                .fail(function (error)
                {
                    if (error)
                    {
                        console.log('error in completing the ajax request');
                    }
                })

            /* event.preventDefault();
            if(button[0].dataset.toggle=='false')
            {
                button.find($('svg')).toggleClass(['far', 'fas']);
                button.attr('data-toggle', 'true');
                button.addClass('text-danger');
                
                let likes=button.find($('span'));
                likes.text(parseInt(likes.text())+1);
            }
            else
            {
                button.find($('svg')).toggleClass(['fas', 'far']);
                button.attr('data-toggle', 'false');
                button.removeClass('text-danger');

                let likes=button.find($('span'));
                likes.text(parseInt(likes.text())-1);
            } */
        })
    }
}
add_click_action_to_like_button()








/* adding "open chatbox on click"  on each badge */
$('#friends-container .badge').click(function(event)
{
    event.preventDefault();
    $('#user-chatbox').toggleClass('d-none');
})