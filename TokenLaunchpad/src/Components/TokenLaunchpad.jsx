import { useState } from "react"
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"

export function TokenLaunchpad() {
  let [inputVal, setInputVal] = useState({
    name: '',
    symbol: '',
    image_url: '',
    supply: '',
  })
  const { connection } = useConnection()
  const wallet = useWallet()
  async function createToken() {
    const lamports = await getMinimumBalanceForRentExemptMint(connection)
    const keypair = Keypair.generate()
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE, //82
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
    )
    const recentTxnHash = await connection.getLatestBlockhash()
    transaction.recentBlockhash = recentTxnHash.blockhash;

    transaction.feePayer = wallet.publicKey

    transaction.partialSign(keypair)
    let response = await wallet.sendTransaction(transaction, connection)
    console.log(response, "==response")
    setInputVal({ name: "", supply: "", symbol: "", image_url: "" })
  }
  return <div style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }}>
    <h2>Solana Token Launchpad</h2>
    <input className="inputtext" placeholder="Name" value={inputVal.name} onChange={(e) => setInputVal({ ...inputVal, name: e.target.value })} />
    <input className="inputtext" placeholder="symbol" value={inputVal.symbol} onChange={(e) => setInputVal({ ...inputVal, symbol: e.target.value })} />
    <input className="inputtext" placeholder="imageurl" value={inputVal.image_url} onChange={(e) => setInputVal({ ...inputVal, image_url: e.target.value })} />
    <input className="inputtext" placeholder="initial Supply" value={inputVal.supply} onChange={(e) => setInputVal({ ...inputVal, supply: e.target.value })} />
    <button className="btn" onClick={createToken}>Create Token</button>
  </div>
}
