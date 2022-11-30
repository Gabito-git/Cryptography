
import './App.css';
import Transaction from './components/Transaction';
import Wallet from './components/Wallet';
import { TransactionContextProvider } from './context/TransactionContext';

function App() {
  return (
    <TransactionContextProvider>
      <div className="App">
        <Wallet />
        <Transaction />
      </div>
    </TransactionContextProvider>
  );
}

export default App;
