const express = require('express');
const express_graphql = require('express-graphql');

let { buildSchema } = require('graphql');

//GraphQL Schema

let schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver

let root = {
    message: () => 'Hello world'
}

//create an express server and a GraphQl endpoint

const app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log('listenning on port 4000');
})