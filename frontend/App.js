import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import {
  Button,
  Code,
  Container,
  Flex,
  Heading,
  OrderedList,
  Link,
  ListItem,
  Text,
} from "@chakra-ui/react";

import "./assets/css/global.css";

import { login, logout, getMetadata } from "./assets/js/near/utils";
import getConfig from "./assets/js/near/config";

export default function App() {
  // use React Hooks to store greeting in component state
  const [metadata, setMetadata] = useState();

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // getMetadata is in near/utils.js
    getMetadata().then((metadata) => {
      console.log("返回数据", metadata);
      setMetadata(metadata);
    });
  }, []);

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <Container
        maxW="container.lg"
        centerContent
        style={{ height: "100vh", justifyContent: "center" }}
      >
        <Heading style={{ marginTop: 32 }}>Welcome to NEAR!</Heading>
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
    <Container
      maxW="container.xl"
      style={{ height: "100vh", justifyContent: "center", padding: 16 }}
    >
      <Flex justify="flex-end">
        <Button onClick={logout}>Sign out</Button>
      </Flex>
      <Container maxW="container.lg" style={{ marginTop: 32 }}>
        <Heading style={{ marginBottom: 16 }} align="center">
          {window.accountId}
        </Heading>
        <Text>
          Look at that! An awesome near app! This metadata is stored on the NEAR
          blockchain. Check it out:
        </Text>
        <OrderedList spacing={3} style={{ paddingTop: 16, paddingBottom: 16 }}>
          <ListItem>
            Look in <Code>src/App.js</Code> and <Code>src/utils.js</Code> –
            you'll see <Code>get_metadata</Code> and being called on{" "}
            <Code>contract</Code>. What's this?
          </ListItem>
          <ListItem>
            Ultimately, this <Code>contract</Code> code is defined in{" "}
            <Code>contract/src/lib.rs</Code> – this is the source code for your{" "}
            <Link
              target="_blank"
              color="teal.500"
              rel="noreferrer"
              href="https://docs.near.org/docs/develop/contracts/overview"
            >
              smart contract
            </Link>
            .
          </ListItem>
          <ListItem>
            When you run <Code>yarn dev</Code>, the code in{" "}
            <Code>contract/src/lib.rs</Code> gets deployed to the NEAR testnet.
            You can see how this happens by looking in <Code>package.json</Code>{" "}
            at the <Code>scripts</Code> section to find the <Code>dev</Code>{" "}
            command.
          </ListItem>
        </OrderedList>
        <hr />
        <Text style={{ paddingTop: 16, paddingBottom: 16 }}>
          To keep learning, check out{" "}
          <Link
            target="_blank"
            color="teal.500"
            rel="noreferrer"
            href="https://docs.near.org"
          >
            the NEAR docs
          </Link>{" "}
          or look through some{" "}
          <Link
            target="_blank"
            color="teal.500"
            rel="noreferrer"
            href="https://examples.near.org"
          >
            example apps
          </Link>
          .
        </Text>
      </Container>
      {showNotification && <Notification />}
    </Container>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || "development");
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;

  return (
    <aside>
      <Link
        target="_blank"
        color="teal.500"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </Link>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: 'set_greeting' in contract:{" "}
      <Link
        target="_blank"
        color="teal.500"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </Link>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
