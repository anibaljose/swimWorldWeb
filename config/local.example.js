var fs = require('fs');
module.exports = {
  auth: 'token', // values: false, 'token'
  host: '0.0.0.0', // A domain name or IP address
  port: 8080, // listen port
  tlsOnly: false, // if true, will use https object
  // see https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
  https: {
    key: fs.readFileSync('./tls/private/js_security.key.secure'),
    cert: fs.readFileSync('./tls/certs/js_security.crt'),
    ca: fs.readFileSync('./tls/certs/ca.pem'),
    passphrase: 'f00.bar',
    ciphers: "ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:AES128-GCM-SHA256:!RC4:HIGH:!MD5:!aNULL",
    honorCipherOrder: true,
  },
  public: "public", // public folder for static files
  mongodb: {
    connection_string: 'mongodb://username:pass@127.0.0.1:27017/futrocksdev',  // change to appropiate value
    db: 'futrocksdev', // change to appropiate value
  },
  salt: '', // JWT salt, change to appropiate value
  jwt: {
    expiresIn: "4d",
    issuer: "https://api.example.io.com/",
  },
  accounts: {
    123: {
      id: 123,
      user: 'john',
      password: 'p4sword123'
      fullName: 'John Doe',
      scope: ['a', 'b']
    }
  }
};
