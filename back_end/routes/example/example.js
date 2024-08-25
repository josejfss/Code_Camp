module.exports = (express,app) => {
	app.get('/',function(req,res){
        res.send('Server Working')
	})

	
}