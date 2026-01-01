import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { ed25519 } from "@noble/curves/ed25519.js"

export function SignMessage() {
  let [inputValue, setInputValue] = useState('')
  const { publicKey, signMessage } = useWallet()
  function changeInputValue(event) {
    setInputValue(event.target.value)
  }

  async function onClick() {
    const encodedMsg = new TextEncoder().encode(inputValue)
    const signiture = await signMessage(encodedMsg)
    if (!ed25519.verify(signiture, encodedMsg, publicKey.toBytes())) {
      alert("Message signature invalid")
      return
    }
    alert("Message has been signed successfully")
    setInputValue('')

  }
  return <div>
    <input id="text" type="text" placeholder="enter yout text" value={inputValue} onChange={changeInputValue} /><br />
    <button onClick={onClick}> Sign Message</button>
  </div>

}
