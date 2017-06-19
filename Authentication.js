var connectionPool=require('./Connection.js');


exports.login=function(req,resp){

	var user_name=req.body.username;
	var password=req.body.password;
	
		
	connectionPool.getConnection(function(err, connection) {


		connection.query('select * from userdata where username= ?',[user_name],function(err,result,fields){

		if(err) {

			res.send({
				"message":"There is an error in the query!!"
			});

			connection.release();
		} //end of if

		else{

			if(result.length>0){

				if(result[0].password === password){

					req.session.fname = result[0].fname;
					req.session.username=result[0].username;

					if(result[0].role==="Admin")
					{
						req.session.role="admin";
					}	
					else
					{
						req.session.role="user";
					}	
					sess=req.session.fname;

					resp.send({
						"message":"Welcome "+req.session.fname
					});

				}

				else{

					resp.send({
						"message":"There seems to be an issue with the username/password combination that you entered"
					});
			}
		}

				else{

					resp.send({
						"message":"There seems to be an issue with the username/password combination that you entered"
					});
			}
		} //outer else

		}); // end of query
	

		connection.release();
  }); // end of createConnection
} // end of login

exports.logout=function(req,res){
	console.log("Logging out");

	if(req.session.fname)
	{
		res.send({"message":"You have been successfully logged out"});
		req.session.destroy();
		
	}
	else
		res.send({"message":"You are not currently logged in"});
		
} // end of logout















