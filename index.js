const express=require('express');
const app=express();
const port=8000;
const routes=require('./routes/entry_point_router');
const expressLayouts=require('express-ejs-layouts');

app.set('case sensitive routing', false);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use('/', routes);

app.listen(port, (error)=>
{
    if(error)
    {
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on the port ${port}`);
})