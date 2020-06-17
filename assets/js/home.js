let add_click_action_to_like_button= function()
{
    for(let like_button of $('.like-buttons'))
    {
        let button=$(like_button);
        button.click(function(event)
        {
            event.preventDefault();
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
            }
        })
    }
}
add_click_action_to_like_button()