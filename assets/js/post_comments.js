function noty_flash(type, message)
{
    new Noty({
        theme: 'metroui',
        text: message,
        type: type,
        layout: 'topRight',
        timeout: 1000,
    }).show();
}


let comment_creator = function ()
{
    let new_comment_form = $('#new-comment-form');
    new_comment_form.submit((event) =>
    {
        event.preventDefault();

        $.ajax(
            {
                type: 'POST',
                url: "/comments/create",
                data: new_comment_form.serialize(),
                success: (data) =>
                {
                    let new_comment = new_comment_dom(data.data);
                    $(`#post-comments-${data.data.post_id}`).prepend(new_comment);
                    $(`#post_${data.data.post_id} #new-comment-form input`)[0].value="";
                    noty_flash('success', 'Comment posted Successfully!');
                    delete_comment($(' .delete-comment-button', new_comment));
                },
                error: (error) =>
                {
                    noty_flash('success', 'Error in posting a comment!');
                    console.log(error.responseText);
                }
            }
        )
    })
}
let new_comment_dom = (data) =>
{
    return $(`<!-- for deleting a comment -->
    <div id="comment_id_${data.comment_id}">
        <div class="dropdown">
            <a class="float-right" href="" id="more_options_${data.comment_id}" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-h"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="more_options_${data.comment_id}">
                <a class="dropdown-item delete-comment-button" href="/comments/destroy/${data.comment_id}"><i
                        class="fas fa-trash-alt"></i>
                    Delete</a>
            </div>
        </div>
        <b>${data.user_name}</b>
        <p>
            ${data.comment_content}
        </p>
        <hr>
    </div>`);
}
let delete_comment = (deleteLink) =>
{
    $(deleteLink).click((event) =>
    {
        event.preventDefault();

        $.ajax(
            {
                type: "GET",
                url: $(deleteLink).prop('href'),
                success: (data) =>
                {
                    $(`#comment_id_${data.data.comment_id}`).remove();
                    noty_flash('success', 'Comment deleted Successfully');
                },
                error: (error) =>
                {
                    console.log(error.responseText);
                    noty_flash('error', 'There was some error in deleting the post!');
                }
            }
        )
    })
}

let apply_dynamic_comment_delete_to_existing_comments = () =>
{
    for (let link of $('.delete-comment-button'))
    {
        delete_comment(link);
    }
}
apply_dynamic_comment_delete_to_existing_comments();
comment_creator()