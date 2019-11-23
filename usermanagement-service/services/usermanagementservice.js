var request=require('./request')
var emailservice=require('../services/mailservice')
const bcrypt = require('bcrypt');
module.exports =  {
    getAccountDetails:getAccountDetails,
    getCustomerDetails:getCustomerDetails,
    getUserDetails:getUserDetails,
    addUserDetails:addUserDetails,
    getHashPassword:getHashPassword,
    sendEmail:sendEmail,
    addCustomerDetails:addCustomerDetails,
    addAccountDetails:addAccountDetails,
    updatePassword:updatePassword
}
function getAccountDetails(req){
    var url="getAccountDetails?accountId="+req.query.accountId
    return request.sendgetrequest(url).then(function(response){
        return JSON.stringify(response);
    });
}
function getCustomerDetails(req){
    var url="getCustomerDetails?accountId="+req.query.accountId+"&customerId="+req.query.customerId
    return request.sendgetrequest(url).then(function(response){
        return JSON.stringify(response);
    });
}
function getUserDetails(req){
    var url="getUserDetails?accountId="+req.query.accountId+"&customerId="+req.query.customerId+"&userId="+req.query.userId
    return request.sendgetrequest(url).then(function(response){
        return JSON.stringify(response);
    });
}
function addUserDetails(req){
    var url="addUser"
    return getHashPassword(req.body.password).then(function(passwordResponse){
        req.body.password=passwordResponse
        return request.sendpostrequest(url,req.body).then(function(userResponse){
            if(userResponse.status==="Success"){
                sendEmail(req.body.loginId);
                    return userResponse
            }else{
                return userResponse;
            }
        });
    })
}
function getHashPassword(password){
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password,bcrypt.genSaltSync(12),function(err,response){
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    })
}
function sendEmail(loginId){
    var activationMailId="http://10.10.1.150:8098/activateLoginId?loginId="+loginId
    let mailOptions = {
        from: '"E2 Infosystems" <sanjaysingh.b@e2infosystems.com>', // sender address
        to: loginId, // list of receivers
        subject: "Login Id Activation", // Subject line
        text: "Activate the login Id", // plain text body
        html: "<a href="+activationMailId+">Activation Link</a>" // html body
    };
    return new Promise(function(resolve, reject) {
        emailservice.sendMail(mailOptions,(error,info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        })
    })
}
function addCustomerDetails(req){
    var url="addCustomerDetails";
    return request.sendpostrequest(url,req.body).then(function(response){
        return response;
    });
}
function addAccountDetails(req){
    var url="addAccountDetails";
    return request.sendpostrequest(url,req.body).then(function(response){
        return response;
    });
}
function updatePassword(req){
    var url="updatePassword";
    return getHashPassword(req.body.password).then(function(passwordResponse){
        req.body.password=passwordResponse;
        return request.sendpostrequest(url,req.body).then(function(userResponse){
            if(userResponse.status==="Success"){
                sendEmail(req.body.loginId);
                    return userResponse
            }else{
                return userResponse;
            }
        });
    })
}



