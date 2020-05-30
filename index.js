const express=require('express');
const app=express();
const port=8000;
const routes=require('./routes/entry_point_router');
const path=require('path');

app.use('/', routes);
/* currently available routes are as follows:
1. '/'
2. 'users/profile'
*/

app.listen(port, (error)=>
{
    if(error)
    {
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on the port ${port}`);
})