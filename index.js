const express = require('express');
const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('./queries')


const app = express()

app.use(express.json({extended : false}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
  res.json({message : "welcome to the postgreSQL world"});
});

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id',deleteUser);

app.listen(4000, ()=> {
  console.log("app listening on port 4000");
});