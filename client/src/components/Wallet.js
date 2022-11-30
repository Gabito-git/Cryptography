import { useContext, useEffect, useState } from 'react';
import './wallet.css';

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { TransactionContext } from '../context/TransactionContext';


const Wallet = () => {
  
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const { dispatch, state:{balance} } = useContext(TransactionContext);

  useEffect(() => {
    if( privateKey.length === 64 ){
      const publicKey = secp.getPublicKey( privateKey );
      const pubToAddress = toHex(publicKey).slice(-20) ;
      setAddress( pubToAddress );
      dispatch( { type: 'SET_PRIVATE-KEY', payload: privateKey } );

      getBalance( pubToAddress );
    }
  }, [privateKey])
  
  const getBalance = async(add) => {
    const resp = await fetch(`http://localhost:4000/api/transaction/${ add }`);
    const data = await resp.json();
    dispatch({ type: 'SET_BALANCE', payload: data.balance } );
  }

  return (
    <div className="card">
        <h2 className="card__title">Your Wallet</h2>
        <label className="card__label">Private Key</label>
        <div className="card__input-field">
            <input 
              placeholder="Type your private key"
              value={ privateKey }
              onChange={ (e) => setPrivateKey( e.target.value ) }
            />
        </div>
        { 
          address && (
            <div>
              <p 
                style={{ fontSize: '1.4rem', color: '#319795' }}
              > Your address: { address } 
              </p>
            </div>  
          )
        }
        <div>
            <p className="balance-field">BALANCE: <span>{ balance }</span></p>
        </div>
    </div>
  )
}

export default Wallet