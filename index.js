const express=require('express');
const app=express();
const port=8000;
const path=require('path');



app.listen(port, (error)=>
{
    if(error)
    {
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on the port ${port}`);
})