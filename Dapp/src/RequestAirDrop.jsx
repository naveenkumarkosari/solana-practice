import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";


export const RequestAirDrop = () => {
  const wallet = useWallet()
  const { connection } = useConnection()
  let [inputValue, setInputValue] = useState('')
  function requestAirDrop() {
    const publicKey = wallet.publicKey;
    const response = connection.requestAirdrop(publicKey, inputValue * LAMPORTS_PER_SOL)
    setInputValue("")
  }
  function changeInputValue(event) {
    setInputValue(event.target.value)
  }
  return <div>
    <input id="amount" type="number" placeholder="Amount" value={inputValue} onChange={changeInputValue} /><br />
    <button onClick={requestAirDrop}>Request Air Drop</button><br />
  </div>
}
