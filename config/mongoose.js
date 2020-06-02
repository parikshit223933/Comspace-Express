const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/comspace_express_development', { useNewUrlParser: true,useUnifiedTopology: true });
const db=mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to the database'));

db.once('open', function()
{
    console.log('Connected to the database!');
});


module.exports=db;