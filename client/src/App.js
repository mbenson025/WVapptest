import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import './App.css';
import "./index.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./components/earth";

import SearchMoments from "./pages/SearchMoments";
import SavedMoments from "./pages/SavedMoments";
import Navbar from "./components/Navbar";
import topSection from "./components/topSection/index.js";
import AppNavbar from "./components/Navbar";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <CanvasContainer>
      <ApolloProvider client={client}>
        <Router>
          <>
            <AppNavbar />
            <Routes>
              <Route path="/" element={<SearchMoments />} />
              <Route path="/saved" element={<SavedMoments />} />
              <Route
                path="*"
                element={<h1 className="display-2">Wrong page!</h1>}
              />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
      <Canvas>
        <Earth />
      </Canvas>
    </CanvasContainer>
  );
}

export default App;
