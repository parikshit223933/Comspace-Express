const express=require('express');
const app=express();
const port=8000;
const routes=require('./routes/entry_point_router');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')

app.use(expressLayouts);
app.use('/', routes);
app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('case sensitive routing', false);
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, (error)=>
{
    if(error)
    {
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on the port ${port}`);
})