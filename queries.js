const Pool = require('pg').Pool

const pool = new Pool({
  user : 'jusfly',
  host : 'localhost',
  database : 'seaber',
  password : 'tylerjusfly1996',
  port : 5432,
})

const getUsers = async(req, res) => {
  try {
    const users = await pool.query('SELECT id, fullname, country FROM person ORDER BY id ASC');
    res.status(200).json(users.rows);
    
  } catch (error) {
    res.status(404).json(error)
  }
};

const getUserById = async(req, res) => {
  const id = parseInt(req.params.id)
  try {
    const userById = await pool.query('SELECT * FROM person WHERE id = $1', [id]);
    if(userById.rowCount === 0 ){return res.status(400).json('this user does not exists anymore')}

    res.status(200).json(userById.rows);
  } catch (error) {
    console.log(error)
    res.status(404).json(error);
  }
}

const createUser = async(req, res) => {
  const {fullname, email, gender, date_of_birth, country} = req.body

  try {
    const newUser = await pool.query('INSERT INTO person(fullname, email, gender, date_of_birth, country)VALUES($1, $2, $3, $4, $5)', [fullname, email, gender, date_of_birth, country]);
    res.status(201).json(`User added with ID ${newUser.rows}`);
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateUser = async(req, res) => {
  const id = parseInt(req.params.id);
  const {fullname, email, gender, date_of_birth, country} = req.body;
  try {
    const update = await pool.query('UPDATE person SET fullname = $1, email = $2, gender = $3, date_of_birth = $4, country = $5 WHERE id = $6', [fullname, email, gender, date_of_birth, country, id]);
    res.status(200).json(`user Modified with Id : ${id}`)
  } catch (error) {
    console.log(error)
    res.status(400).send('server error');
  }
}

const deleteUser = async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await pool.query('DELETE FROM person WHERE id = $1', [id]);
    if(deletedUser.rowCount === 0){res.status(400).json('this user does not exists anymore')}
    else{ res.status(200).json(`user deleted with ID: ${id}`);}
  } catch (error) {
    console.log(error)
    res.status(404).json('server error')
  }
}

module.exports = {
  getUsers, getUserById, createUser, updateUser, deleteUser
}