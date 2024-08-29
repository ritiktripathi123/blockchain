const MINE_RATE = 1000;  //1s = 1000ms
const INITIAL_DIFFICULTY = 3;
const GENESIS_DATA={    // this is basically the creation of genesis block  only and only for creating genesis block
    timestamp:"16/03/2024",
    prevHash:"0x000",
    hash:"0x123",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data:[],


};
module.exports = { GENESIS_DATA, MINE_RATE }; 