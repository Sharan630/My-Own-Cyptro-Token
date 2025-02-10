import React, { useState } from "react";
import { token , canisterId , createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

 const[isDisabled , setDisabled] = useState(false);
 const[buttonText , setbutttonText]= useState("Gimme gimme");
  
  async function handleClick(event) {
    setDisabled(true);


    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
    agentOptions : {
      identity,
    },
  });




    const result = await token.payOut();
    setbutttonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DSharan tokens here! Claimed 10,000 DSHA token to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
