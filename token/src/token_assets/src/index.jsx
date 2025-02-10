import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';

const init = async () => { 
  

  const authClient = await AuthClient.create();
  if(await authClient.isAuthenticated() ){
    handleAuthenticated(authClient);
  }
  else{
  await authClient.login({
    identityProvider : "https://identity.ic0.app/#authorize",
    onSucess : () => {
      handleAuthenticated(authClient);
    }
  });
}
}

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  const usePrincipal = identity._principal.toString();
  console.log(usePrincipal);
  ReactDOM.render(<App loggedInPrincipal = {usePrincipal} />, document.getElementById("root"));
}

init();


