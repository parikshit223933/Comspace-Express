const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const log_directory=path.join(__dirname, '../production_logs');
fs.existsSync(log_directory)||fs.mkdirSync(log_directory);//clever way to write code!

const accessLogStream=rfs.createStream('access.log', {
    interval:'1d',
    path:log_directory,
});

const development =
{
    name: 'development',
    asset_path: './assets',
    session_cookie_key: process.env.COMSPACE_SESSION_COOKIE_KEY,
    database_name: 'comspace_express_development',
    smtp:
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.COMSPACE_SMTP_AUTH_USER,
            pass: process.env.COMSPACE_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.COMSPACE_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.COMSPACE_GOOGLE_CLIENT_SECRET,
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret_or_key:'Comspace_Express',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}
const production =
{
    name: 'production',
    asset_path: process.env.COMSPACE_ASSET_PATH,
    session_cookie_key: process.env.COMSPACE_SESSION_COOKIE_KEY,
    database_name: process.env.COMSPACE_DATABASE_NAME,
    smtp:
    {
        service: process.env.COMSPACE_SMTP_SERVICE,
        host: process.env.COMSPACE_SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.COMSPACE_SMTP_AUTH_USER,
            pass: process.env.COMSPACE_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.COMSPACE_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.COMSPACE_GOOGLE_CLIENT_SECRET,
    google_callbackURL: 'http://www.comspaceexpress.codes/users/auth/google/callback',
    jwt_secret_or_key:process.env.COMSPACE_JWT_SECRET_OR_KEY,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports = eval(process.env.NODE_ENV)==undefined?development:eval(process.env.NODE_ENV);