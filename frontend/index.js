import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import { initContract } from "./assets/js/near/utils";

const container = document.querySelector("#root");
const root = createRoot(container);

window.nearInitPromise = initContract()
  .then(() => {
    <App />;
    root.render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
  })
  .catch(console.error);
