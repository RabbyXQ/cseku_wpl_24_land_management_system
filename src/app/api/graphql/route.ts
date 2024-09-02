import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest, NextResponse } from 'next/server';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let apolloServerStarted = false;

async function startApolloServer() {
  if (!apolloServerStarted) {
    await server.start();
    apolloServerStarted = true;
  }
}

export async function GET(req: NextRequest) {
  await startApolloServer();

  const url = new URL(req.url);
  const query = url.searchParams.get('query') || '';

  if (!query) {
    return NextResponse.json({
      errors: [{ message: 'GraphQL query must be provided' }],
    }, { status: 400 });
  }

  const result = await server.executeOperation({
    query,
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  await startApolloServer();

  const body = await req.json();
  const { query, variables } = body;


  if (!query) {
    return NextResponse.json({
      errors: [{ message: 'GraphQL query must be provided' }],
    }, { status: 400 });
  }

  const result = await server.executeOperation({
    query,
    variables,
  });

  return NextResponse.json(result);
}
