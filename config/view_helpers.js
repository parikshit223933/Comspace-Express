const env=require('./environment');
const { json } = require('express');
const fs=require('fs');
const path=require('path');

module.exports=(app)=>
{
    app.locals.assetPath=(filePath)=>
    {
        if(env.name=='development')
        {
            return filePath;
        }
        let manifest= JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/manifest.json')));
        return '/'+manifest[filePath];
    }
}