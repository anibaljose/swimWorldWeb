/**
 * @author David Yzaguirre <dvdyzag@gmail.com>
 *
 * @copyright Copyright (c) 2016, David Yzaguirre
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */
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
    connection_string: 'mongodb://username:pass@127.0.0.1:27017/swimworld',  // change to appropiate value
    db: 'swimworld', // change to appropiate value
  },
  salt: '', // JWT salt, change to appropiate value
  jwt: {
    expiresIn: "4d",
    issuer: "https://api.example.io.com/",
  },
};
