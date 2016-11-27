const SHA256 = require('crypto-js').SHA256;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123';

/*bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
        console.log(hash);
    });
});*/

var hashedPassword = '$2a$10$JxUBVaO3Zs/dNgUeRHJq1e5d1htbxCngO7XU758NKh37BSMccMdcq';

bcrypt.compare(password, hashedPassword, function (err, res) {
    console.log(res);
});

/*var data = {
    id: 20
};

var token = jwt.sign(data, '123');
console.log(token);

var decoded = jwt.verify(token, '123');
console.log(decoded);

var message = 'I am user number 1';
var hash = SHA256(message).toString();*/

/*console.log('Message', message);
console.log('Hash', hash);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed.')
}*/
