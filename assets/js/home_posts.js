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

/* method to submit the form data for new post using ajax */
let create_post = () =>
{
    let new_post_form = $('#new-post-form');
    new_post_form.submit((event) =>
    {
        event.preventDefault();
        
        $.ajax(
            {
                type: 'POST',
                url: '/posts/create',
                data: new_post_form.serialize()/* this will serialize the data recieved into the json format */,
                success: (data) =>
                {
                    /* the data we are recieving here is already in json format! */
                    let new_post=new_post_dom(data.data);
                    $('#posts-container').prepend(new_post);
                    noty_flash('success', 'Post created Successfully!');

                    $('textarea')[0].value="";/* clearing the text area */
                    deletePost($(' .delete-post-button', new_post));
                },
                error: (error) =>
                {
                    console.log(error.responseText);
                }
            }
        );
    });
}
let new_post_dom = (data) =>
{
    return $(`<!-- for loop for comment cards -->
    <div class="card w-100 mt-3 mb-2" id="post_${data.post_id}">
        <div class="card-body">
    
            <!-- options to delete a post and stuff -->
            
            <div class="dropdown">
                <a class="float-right" href="" id="more_options_${data.post_id}" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </a>
                <div class="dropdown-menu" aria-labelledby="more_options_${data.post_id}">
                    <a class="dropdown-item delete-post-button" href="/posts/destroy/${data.post_id}"><i
                            class="fas fa-trash-alt"></i>
                        Delete</a>
                </div>
            </div>
            
    
    
            <h5 class="card-title">${data.user_name}</h5>
            <p class="card-text">${data.post_content}</p>
            <div class="card-text mt-2"><small>${data.updatedAt.toString().substr(0, 15)}</small></div>
            <hr>
            <a href=""><i class="far fa-heart"></i></a>&nbsp&nbsp&nbsp
            <a data-toggle="collapse" href="#collapse_${data.post_id}" role="button" aria-expanded="false"
                aria-controls="collapse${data.post_id}"><i class="far fa-comment"></i></a>&nbsp&nbsp&nbsp
            <a href=""><i class="fas fa-paper-plane"></i></a>
        </div>
        <div class="collapse post-comments mr-2 ml-2" id="collapse_${data.post_id}">
            
            <form action="/comments/create" method="POST">
                <input type="text" class="form-control" placeholder="Add a new Comment..." aria-label="Username"
                    aria-describedby="basic-addon1" name="content" required>
                <input type="hidden" name="post" value="${data.post_id}">
                <button type="submit" class="btn btn-primary btn-sm mt-2 mb-2 mr-2">Add Comment</button>
            </form>
            <!-- comments list container -->
            <hr>
            <div class="post-comments-lister-list pl-4 pr-4">
                <div id="post-comments-${data.post_id}">
                
                </div>
            </div>
            
        </div>
    </div>`)
}


// method to delete a post from DOM
let deletePost=(deleteLink)=>
{
    $(deleteLink).click((event)=>
    {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: $(deleteLink).prop('href'),
            success:(data)=>
            {
                $(`#post_${data.data.post_id}`).remove();
                noty_flash('success', 'Post deleted Successfully')
            },
            error:(error)=>
            {
                console.log(error.responseText);
                noty_flash('error', 'There was some error in deleting the post');
            }
            });
    })
}

let apply_dynamic_delete_to_existing_posts=function()
{
    for(let link of $('.delete-post-button'))
    {
        deletePost(link);
    }
}

apply_dynamic_delete_to_existing_posts()
create_post();