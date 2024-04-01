const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

function verifyAccountCPF(request, response, next){

  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if(!customer){
    return response.status(400).json({ error: "Custumer not found"})
  }

  request.customer = customer;

  return next();
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadExists = customers.some((customer) => customer.cpf === cpf);

  if (customerAlreadExists) {
    return response.status(400).json({ error: "Customer Already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement", verifyAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});





app.listen(3333);

