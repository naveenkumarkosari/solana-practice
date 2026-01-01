import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export const ShowBalance = () => {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [userBalance, setUserBalance] = useState('')
  async function getUserBalance() {
    let balance = await connection.getBalance(wallet?.publicKey)
    balance = balance / LAMPORTS_PER_SOL
    setUserBalance(balance)
  }
  useEffect(() => {
    getUserBalance()
  }, [wallet])
  return <div>
    {userBalance}
  </div>
}
