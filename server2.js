const express = require('express');
const express_graphql = require('express-graphql');

let { buildSchema } = require('graphql');

//GraphQL Schema

let schema = buildSchema(`
    type Query {
        Course(id: Int!): Course
        Courses(topic: String): [Course]
    }

    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const coursesData = [
    {
        id: 1,
        title: 'The Complete Nodejs Developer Course',
        author: "Andrew Mead, Rob Percival",
        description: "Learn Node.js by building real-world applications with Node, Express, MongoDB",
        topic: "Nodejs",
        url: "https://codingthesmartway.com/nodejs"
    },
    {
        id: 2,
        title: 'The Complete MongoDB Developer Course',
        author: "Andrew Mead, Rob Percival",
        description: "Learn Mongodb by building real-world applications with Node, Express, MongoDB",
        topic: "Mongodb",
        url: "https://codingthesmartway.com/mongodb"
    },
    {
        id: 3,
        title: 'The Complete Expressjs Developer Course',
        author: "Andrew Mead, Rob Percival",
        description: "Learn Expressjs by building real-world applications with Node, Express, MongoDB",
        topic: "Expressjs",
        url: "https://codingthesmartway.com/expressjs"
    }
]

let getCourse = (args) => {
    let id = args.id;
    return coursesData.filter(course => {
        return course.id === id;
    })[0]
}

let getCourses = (args) => {
    let topic = args.topic;
    if(!topic) return coursesData;
    return coursesData.filter(course => {
        return course.topic === topic;
    })
}

let updateCourseTopic = ({id, topic}) =>{
    coursesData.map(course => {
        if(course.id === id){
            course.topic = topic;
            return course
        }
    });
    return coursesData.filter(course => course.id === id)[0];
}

// Root resolver
let root = {
    Course: getCourse,
    Courses: getCourses,
    updateCourseTopic: updateCourseTopic
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