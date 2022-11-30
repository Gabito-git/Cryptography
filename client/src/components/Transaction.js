import { useContext, useState } from 'react';
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 }  from "ethereum-cryptography/keccak";
import { utf8ToBytes }  from "ethereum-cryptography/utils";

import './transaction.css';
import { TransactionContext } from '../context/TransactionContext';

const Transaction = () => {

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const {dispatch, state:{ privateKey } } = useContext(TransactionContext);
  
  const onSubmit = async(e) => {
    e.preventDefault();

    const bytes = utf8ToBytes( amount );
    const hash  = keccak256( bytes );

    const [ sig, recoveryBit ] = await secp.sign(hash, privateKey, {recovered: true} );

    const resp = await fetch( 'http://localhost:4000/api/transaction/send',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        signature: sig,
        recoveryBit,
        recipient,
        amount
      })
    } )

    const {balance} = await resp.json();
    dispatch({type: 'SET_BALANCE', payload:balance});

  }

  return (
    <div className="card">
        <h2 className="card__title">Send Transaction</h2>
        <form onSubmit={ onSubmit }>
          <label className="card__label">Send Amount</label>
          <div className="card__input-field">
              <input 
                placeholder="1,2,3"
                value={ amount }
                onChange={ (e) => setAmount( e.target.value ) }
              />
          </div>
          <label className="card__label">Recipient</label>
          <div className="card__input-field">
              <input 
                placeholder="Type an address"
                value={ recipient }
                onChange={ (e) => setRecipient( e.target.value ) }
              />
          </div>
          <button className='button'>
              TRANSFER
          </button>
        </form>
       
    </div>
  )
}

export default Transaction