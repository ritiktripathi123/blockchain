const crypto = require("crypto");
const cryptoHash=(...inputs)=>{  
    const hash = crypto.createHash('sha256') //spread operator multiple inputs can take
    hash.update(inputs.sort().join('')); //ritik tripathi
    return hash.digest("hex");
};

result = cryptoHash("ritik","tripathi");
module.exports = cryptoHash;
console.log(result)