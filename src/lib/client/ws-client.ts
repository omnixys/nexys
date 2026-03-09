import { ApolloClient, ApolloLink, InMemoryCache, Observable } from "@apollo/client";
import { type Client, createClient } from "graphql-ws";

function createWsLink(client: Client): ApolloLink {
  return new ApolloLink((operation) => {
    return new Observable((sink) => {
      const dispose = client.subscribe(
        {
          ...operation,
          query: operation.query.loc?.source.body ?? "",
        },
        {
          next: sink.next.bind(sink),
          error: sink.error.bind(sink),
          complete: sink.complete.bind(sink),
        },
      );

      return () => dispose();
    });
  });
}

export function createWsApolloClient(token?: string) {
  if (typeof window === "undefined") return null;

  const httpUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL!;
  const wsUrl = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || httpUrl.replace(/^http/, "ws");

  const wsClient = createClient({
    url: wsUrl,
    lazy: true,
    connectionParams: () => (token ? { Authorization: `Bearer ${token}` } : {}),
  });

  const wsLink = createWsLink(wsClient);

  return new ApolloClient({
    link: wsLink, // now it's a REAL ApolloLink
    cache: new InMemoryCache(),
  });
}
