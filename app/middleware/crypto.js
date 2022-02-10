const crypto = require('crypto');
const CRYPTO_KEY = "bf3c199c2470cb477d907b1e0917c17b";
const IV = "5183666c72eec9e4";

module.exports = {
    // ENCRYPT OR DECRYPT
    encrypt: (val) => {
        let cipher = crypto.createCipheriv('aes-256-cbc', CRYPTO_KEY, IV);
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    },
    decrypt: (val) => {
        let decipher = crypto.createDecipheriv('aes-256-cbc', CRYPTO_KEY, IV);
        let decrypted = decipher.update(val, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
    },
}