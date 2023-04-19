import express from 'express';
const app = express();
const port = 1234;

import user from "./mock/user.json" assert { type: "json" };
import auth from "./mock/auth.json" assert { type: "json" };
import fields from "./mock/fields.json" assert { type: "json" };
import table from "./mock/list.json" assert { type: "json" };

const mock = "test"

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/user', (req, res) => {
  res.send({
    content: user
  })
})

app.get('/auth', (req, res) => {
  res.send({
    content: auth
  })
})
app.get(mock+'/fields', (req, res) => {
  res.send({
    content: fields
  })
})

// CRUD
app.post(mock+"/add", (req, res) => {
  res.send({
    code:0,
    message:"success"
  })
})
app.get(mock+'/list', (req, res) => {
  res.send({
    content: table
  })
})

app.post(mock+"/update", (req, res) => {
  res.send({
    code:0,
    message:"success"
  })
})

app.delete(mock+"/delete", (req, res) => {
  res.send({
    code:0,
    message:"success"
  })
})



app.listen(port, () => {
  console.log(`express app listening at http://localhost:${port}`)
});

