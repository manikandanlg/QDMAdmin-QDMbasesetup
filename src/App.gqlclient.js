/**
 * @author Kameshwaran Murugan
 * @email kamesh@qdmplatforms.com
 * @create date 2020-11-27
 * @modify date 2020-12-01
 * @desc GraphQL client setup done here using the Apollo Client.
 */

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloGQLClient from "./graphql";

const AppGQLClient = (props) => {
  return (
    <ApolloProvider client={ApolloGQLClient}>{props.children}</ApolloProvider>
  );
};

export default AppGQLClient;
