const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Digital Hub - Backend Assignment - CP',
            description: 'The purpose of this test is to show off your level of Back-end development skills and to show your knowledge of modern back-end frameworks and practices.',
            contact:{
                name: 'Xchel Sanchez',
                email: "xchelsvz@gmail.com"
            },
            servers:['http://localhost:4000']
        }
    },
    apis: ['./swagger-docs/*.js','./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json({extended: true}));

app.use('/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Running on Port number ${PORT}`);
})