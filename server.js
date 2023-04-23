import express from 'express';

import user from './mock/user.json' assert { type: 'json' };
import auth from './mock/auth.json' assert { type: 'json' };
import fields from './mock/fields.json' assert { type: 'json' };
import table from './mock/list.json' assert { type: 'json' };

const app = express();
const port = 1234;

const mock = '/test';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user', (req, res) => {
  res.send({ code: 0,
    data: user
  });
});

app.get('/auth', (req, res) => {
  res.send({ code: 0,
    data: auth
  });
});
app.get(mock + '/fields', (req, res) => {
  res.send({ code: 0,
    data: fields
  });
});

// CRUD
app.post(mock + '/add', (req, res) => {
  res.send({ code: 0,
    code: 0,
    message: 'success'
  });
});
app.get(mock + '/list', (req, res) => {
  res.send({ code: 0,
    data: table
  });
});

app.post(mock + '/update', (req, res) => {
  res.send({ code: 0,
    code: 0,
    message: 'success'
  });
});

app.delete(mock + '/delete', (req, res) => {
  res.send({ code: 0,
    code: 0,
    message: 'success'
  });
});

app.listen(port, () => {
  console.log(`express app listening at http://localhost:${port}`);
});

