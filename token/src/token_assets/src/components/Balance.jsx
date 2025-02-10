import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import {  token } from "../../../declarations/token";

function Balance() {

  const[intputValue , setInput] = useState("");
  const[balanceResult , setBalance] = useState("");
  const[cyptroSymbol , setSymbol] = useState("");
  const[isHidden , setHidden] = useState("true");
  
  async function handleClick() {
    const principal = Principal.fromText(intputValue);
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setHidden(false);

  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={intputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden = {isHidden}>This account has a balance of{balanceResult} {cyptroSymbol}.</p>
    </div>
  );
}

export default Balance;
