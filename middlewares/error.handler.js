
function logErrors (err,req,res,next)
{
 console.error('logErrors');
  console.error(err);

  next(err);
}

function errorHandler (err,req,res,next){
 console.error('errorHandler');
 res.status(500).json({
   message: err.message,
   stack: err.stack,

 })
}
module.exports ={logErrors , errorHandler}
