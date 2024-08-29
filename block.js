const {GENESIS_DATA, MINE_RATE}= require("./config");//genesis block creation import
const cryptoHash = require("./crypto-hash");//sha256 import
class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){//in object access form because in const block the order may change
        this.timestamp = timestamp;             //in future we have to add more detail like nonce and difficulties 
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
        
    }
    static genesis(){       // made ststic function for genesis block
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash= prevBlock.hash;
        let {difficulty} =prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock:prevBlock,
                timestamp,
            });
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        } while (hash.substring(0,difficulty)!=="0".repeat(difficulty));// our initial difficulty is set to 3 and let suppose the hash is abcdef then we update our hast untill the first three bits of our hast is not 0 i.e. 000def
        return new this({
            
            timestamp, 
            prevHash, 
            data, 
            difficulty, 
            nonce, 
            hash,
        });
    }
/* now this is the static function for the difficulty of the block we are now changing
the difficulty again and again and making the difficulty a dynamic */
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty<1) return 1;
        const difference=timestamp-originalBlock.timestamp;
        if(difference>MINE_RATE) return difficulty-1;
        return difficulty+1;


    }
}

const block1= new Block({timestamp:"16/03/2024",prevHash:"0xdfg",hash:"0xd23",data:"my name is ritik"});
//const block2= new Block({timestamp:"17/03/2024",prevHash:"0xd23",hash:"0x453",data:"I Transfered 100 indian rupees"});
//const genesisBlock = Block.genesis();
//console.log(genesisBlock);
//const result = Block.mineBlock({ prevBlock: block1, data: "block2" }); // taking input as defined static function static mineBlock()
//console.log(result);
//console.log(block1)
//console.log(block2)
module.exports = Block;