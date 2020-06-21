const env=require('./environment');
const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost/${env.database_name}`, { useNewUrlParser: true,useUnifiedTopology: true });
const db=mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to the database'));

db.once('open', function()
{
    console.log('Connected to the database!');
});


module.exports=db;