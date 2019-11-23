const request = require('request');
const constanturl='http://localhost:8096/usermanagement/';
module.exports =  {
    sendgetrequest: sendgetrequest,
    sendpostrequest:sendpostrequest
}
function sendgetrequest(requesturl){
    return new Promise(function(resolve, reject) {
        request(constanturl+requesturl,
        function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(response.body));
            }
        });
    })
}
function sendpostrequest(requesturl,data){
    return new Promise(function(resolve, reject) {
        request.post(constanturl+requesturl, {
            json:data
        }, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.body);
            }
        })
    })
}