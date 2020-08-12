const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers');

const app = express();
const port = process.env.PORT || 3000;

// Schema
const typeDefs = readFileSync(join(__dirname, '/lib', 'schema.graphql'), 'utf-8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Configure resolvers
//const resolver = resolvers;

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
});

// // executing
// graphql(schema, '{ hello, greeting }', resolvers)
//   .then(data => console.log(data))