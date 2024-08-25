const config ={
    db:{
        credentials:{
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    },
    cognito:{
        credentials: {
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            ClientId: process.env.AWS_COGNITO_CLIENT_ID
        }
    },
    rekognition:{
        credentials:{
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            apiVersion: '2016-06-27'
        }
    },
    translate:{
        credentials:{
            region: process.env.AWS_REGION,
            accessKeyId: process.env.TRANSLATE_ACCESS_KEY_ID,
            secretAccessKey: process.env.TRANSLATE_SECRET_ACCESS_KEY
        }
    },
    listPerPage: 10,

};
module.exports = config;