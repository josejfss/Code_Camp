const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = (express,app) => {
    
	app.get('/',upload.any(), async function(req,res){
        res.status(200).json({response_text:"Hello World"});
        
    });
}