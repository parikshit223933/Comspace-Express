/* method to submit the form data for new post using ajax */
let create_post=()=>
{
    let new_post_form=$('#new-post-form');
    new_post_form.submit((event)=>
    {
        event.preventDefault();
        
        $.ajax(
            {
                type:'POST',
                url:'/posts/create',
                data:new_post_form.serialize()/* this will serialize the data recieved into the json format */,
                success:(data)=>
                {
                    /* the data we are recieving here is already in json format! */
                    console.log(data);
                },
                error:(error)=>
                {
                    console.log(error.responseText);
                }
            }
        );
    });
}
create_post();