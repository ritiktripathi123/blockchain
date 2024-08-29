const Block = require("./block");
const cryptoHash = require("./crypto-hash");
class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];// this is the creation of the first genesis block and a chain array is also created here
    }

    addBlock({ data }){
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length-1],
            data,
        });
        this.chain.push(newBlock);
    }
    /* this is the function to check for the longest chain because in out blockchaiin we only select the longest chain we are making a 
    function that is the replace chain*/
    replaceChain(chain){
        if (chain.length <= this.chain.length){
            console.error("the new incoming chain is not longer then our current chain");
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error("the incoming new chain is not valid");
            return;
        }
        this.chain = chain;
    }

    static isValidChain(chain){//here we are going to check that the created blockchain is valid or not
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){ return false;} /*here we use the extension of json that is stringyfy for 
        teh compatibility check for better result outcome*/
        for (let i=1;i<chain.length;i++){
            const {timestamp, prevHash, hash, nonce, difficulty, data}= chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realLastHash = chain[i-1].hash;//
            
            if(prevHash !== realLastHash) return false;//here we are chaecking that the prevhash is equal to the hash of previous block or not
            
            const validatedHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
            if (hash !== validatedHash) return false;/*checking that is someone try to push the wrong block in the blockchain in which the block 
            contains the hash value already we are just taking the time stamp prevhash and data and then uses the sha 256 algorithm to calculate
            the hash of the new block and then compare it with the hash value*/
            if(Math.abs(lastDifficulty-difficulty) > 1) return false;


        }
        return true;
    }
    


}
const blockchain = new Blockchain();// creating an object for demonstration
blockchain.addBlock({data: "Block1"});
blockchain.addBlock({data: "Block2"});
blockchain.addBlock({data: "Block3"});

const result = Blockchain.isValidChain(blockchain.chain);//here we are creating the object result and then checking that the created block chain is valid or not if anyone tries to do some malicious activity then it will result false or otherwise true
console.log(blockchain.chain);
console.log(result)
module.exports = Blockchain;// exporting the module for use in another part of the program