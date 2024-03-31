const express = require("express");
const { v4:uuidv4 } = require("uuid");

const app = express();
app.use(express.json())

const custumers = [];

app.post("/account", (request, response)=>{

    const { cpf, name } = request.body;
    const id = uuidv4();
    custumers.push({
        cpf,
        name, 
        id, 
        statement: []
    });

   return response.status(201).send();
})

app.listen(3333);
