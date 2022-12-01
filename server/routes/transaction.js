const { Router } = require('express');
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

const generateAccount = require('../helpers/generateAccounts');

const router = Router();
const balances = {};
const values = [100, 75, 50]
const id = 0;
        
values.forEach( value => {
    const address = generateAccount();
    balances[ address ] = value;
})

router.get('/:address', (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.json({ balance })
})

router.post('/send', async( req, res ) => {
    const { signature, recoveryBit, recipient, amount } = req.body;
    const sig = new Uint8Array(Array.from(Object.values( signature )));

    const message = {
        recipient,
        amount,
        id
    }

    const bytes = utf8ToBytes( JSON.stringify(message) );
    const hashedMessage = keccak256( bytes );
    const recovered = secp.recoverPublicKey(hashedMessage, sig, recoveryBit);

    const sender = toHex(recovered).slice(-20);
    if (!balances[sender]) balances[sender] = 0;
    if (!balances[recipient]) balances[recipient] = 0;

    if( balances[ sender ] < amount ){
        return res.status(400).json({
            err: 'Not enough funds!!!'
        })
    }

    balances[ sender ] -= +amount;
    balances[ recipient ] += +amount;
    id++;
    res.status(200).json({balance: balances[sender]});
})

module.exports = router;