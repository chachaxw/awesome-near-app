import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { Button, Container, Heading, Text } from "@chakra-ui/react";

import "./assets/css/global.css";

import { login, logout, getCount } from "./assets/js/near/utils";
import getConfig from "./assets/js/near/config";

export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = useState();

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // get_greeting is in near/utils.js
    getCount().then((countFromContract) => {
      console.log("返回数据", countFromContract);
      setGreeting(countFromContract);
    });
  }, []);

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <Container w="full" maxW="container.lg" centerContent>
        <Heading>Welcome to NEAR!</Heading>
        <Text align="center">
          Your contract is storing a greeting message in the NEAR blockchain. To
          change it you need to sign in using the NEAR Wallet. It is very
          simple, just use the button below.Do not worry, this app runs in the
          test network ("testnet"). It works just like the main network
          ("mainnet"), but using NEAR Tokens that are only for testing!
        </Text>
        <div style={{ textAlign: "center", marginTop: "2.5em" }}>
          <Button onClick={login}>Connect with Near</Button>
        </div>
      </Container>
    );
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: "right" }} onClick={logout}>
        Sign out
      </button>
      <Container>
        <h1>
          {greeting && (
            <p
              style={{
                color: "var(--secondary)",
                borderBottom: "2px solid var(--secondary)",
              }}
            >
              {greeting}
            </p>
          )}
          {window.accountId}!
        </h1>
        <p>
          Look at that! A Hello World app! This greeting is stored on the NEAR
          blockchain. Check it out:
        </p>
        <ol>
          <li>
            Look in <code>src/App.js</code> and <code>src/utils.js</code> –
            you'll see <code>get_greeting</code> and <code>set_greeting</code>{" "}
            being called on <code>contract</code>. What's this?
          </li>
          <li>
            Ultimately, this <code>contract</code> code is defined in{" "}
            <code>assembly/main.ts</code> – this is the source code for your{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.near.org/docs/develop/contracts/overview"
            >
              smart contract
            </a>
            .
          </li>
          <li>
            When you run <code>yarn dev</code>, the code in{" "}
            <code>assembly/main.ts</code> gets deployed to the NEAR testnet. You
            can see how this happens by looking in <code>package.json</code> at
            the <code>scripts</code> section to find the <code>dev</code>{" "}
            command.
          </li>
        </ol>
        <hr />
        <p>
          To keep learning, check out{" "}
          <a target="_blank" rel="noreferrer" href="https://docs.near.org">
            the NEAR docs
          </a>{" "}
          or look through some{" "}
          <a target="_blank" rel="noreferrer" href="https://examples.near.org">
            example apps
          </a>
          .
        </p>
      </Container>
      {showNotification && <Notification />}
    </>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || "development");
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;

  return (
    <aside>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: 'set_greeting' in contract:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
