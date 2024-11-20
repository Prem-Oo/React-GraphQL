import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.forEach(({ message}) => {
            console.error(`GraphQL error: ${message}`);
        });
    }
    if (networkError) {
        console.error(`Network error: ${networkError}`);
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "https://boot-graphql-latest.onrender.com/graphql" })
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

// eslint-disable-next-line react/prop-types
const ApolloProviderWrapper = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloProviderWrapper;
