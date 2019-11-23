var userservice=require('../services/usermanagementservice')
var appRouter = function(app) {
    app.get("/getAccountDetails", function(req,res) {
        if(req.query.accountId==undefined){
            res.status(400);
            res.send('Params missing');
        }else{
            userservice.getAccountDetails(req).then(function(response){
                res.send(response);
            })
        }
    });
    app.get("/getCustomerDetails", function(req,res) {
        if(req.query.accountId===undefined||req.query.customerId===undefined){
            res.status(400);
            res.send('Params missing');
        }else{
            userservice.getCustomerDetails(req).then(function(response){
                res.send(response);
            })
        }
    });
    app.get("/getUserDetails", function(req,res) {
        if(req.query.accountId===undefined||req.query.userId===undefined){
            res.status(400);
            res.send('Params missing');
        }else{
            userservice.getUserDetails(req).then(function(response){
                res.send(response);
            })
        }
    });
    app.post("/addUserDetails",function(req,res){
        if(req.body.loginId===undefined||req.body.password===undefined||req.body.accountId===undefined){
            res.status(400);
            res.send('Params missing');
        }else{
            userservice.addUserDetails(req).then(function(response){
                res.send(response);
            })
        }
    })
    app.post("/addCustomerDetails",function(req,res){
        if(req.body.accountId===undefined||req.body.customerName===undefined){
            res.status(400);
            res.send('Params missing');
        }else{
            userservice.addCustomerDetails(req).then(function(response){
                res.send(response);
            })
        }
    })
    app.post("/addAccountDetails",function(req,res){
        if(req.body.emailId===undefined||req.body.accountName===undefined){
            res.status(400);
            res.send('Params missing');
        }else{
            userservice.addAccountDetails(req).then(function(response){
                res.send(response);
            })
        }
    })
}

module.exports = appRouter