
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");


const sign = async() => {
    const bytes = utf8ToBytes( "25" );
    const hashMessage = keccak256( bytes );
    const [sig, recoverBit] = await secp.sign( hashMessage,
        '3d21dc43d47da4ee32a4e55a01f5bf098b59ecef52dd44a251bd95b04033edd3', 
        {recovered: true} 
    );

    return [ sig, recoverBit ];

}

module.exports = sign;
