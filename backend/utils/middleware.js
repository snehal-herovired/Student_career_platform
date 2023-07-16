
// any func which deals with your req and res body and also has acces to next method ;
function middleware(req, res, next) {
    let token = req.headers.authorisation;

    // token authorisation ,it comes with Bearer keyword ;
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
        next() 
        // next() passes the control from this middleware to presiding middleware;
    }
    return res.send("token is invalid")
    
}

module.exports = middleware



// jwt.sign --> creation of token -----> during login while the sending the response to client
// jwt .verify ----> used for verifying token ---> create a custom function which takes token from client headers and compare with secret key.