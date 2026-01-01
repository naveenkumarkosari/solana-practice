import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"

export const SendToken = () => {
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const { connection } = useConnection()
  const wallet = useWallet()
  function changeReceiver(event) {
    setReceiver(event.target.value)
  }
  function changeAmount(event) {
    setAmount(event.target.value)
  }
  async function SendTokens() {
    const txn = new Transaction()
    txn.add(SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: receiver,
      lamports: amount * LAMPORTS_PER_SOL
    }))
    await wallet.sendTransaction(txn, connection)
    alert(`sent ${amount}`)
  }
  return <div>
    <input id="to" type="text" placeholder="Reciever Public Key" value={receiver} onChange={changeReceiver} />
    <input id="amount" type="text" placeholder="Amount" value={amount} onChange={changeAmount} />
    <button onClick={SendTokens}>Send</button>
  </div>
}
