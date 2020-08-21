const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// Schema
const typeDefs = readFileSync(join(__dirname, '/lib', 'schema.graphql'), 'utf-8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Configure resolvers
//const resolver = resolvers;

app.use(cors());

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev,
}));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
});

// // executing
// graphql(schema, '{ hello, greeting }', resolvers)
//   .then(data => console.log(data))