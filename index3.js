import express from 'express'
import cors from 'cors'

const app = express()

import { Sequelize, DataTypes } from 'sequelize';

//const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite 연결 성공');
  } catch (err) {
    console.error('연결 실패:', err);
  }
})();

const comments = sequelize.define(
  'commentbls',
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

// `sequelize.define` also returns the model
(async () =>{
  await comments.sync();
  console.log('The table for the User model was just (re)created!');
});

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs') 

app.get('/',async function(req, res){
    
    const users = await comments.findAll();
    res.render('index1', { comments: users});
})

app.post('/create', async function(req, res){
    console.log(req.body)
    const { comment} = req.body;
   
    const jang = await comments.create({ comment: comment });
    console.log("jang'a auto-generateed ID:", jang.id);
    res.redirect('/');
 })

app.post('/update/:id', async function(req, res){

    const {id} =   req.params;
    const {comment} = req.body;

    console.log(id);
    console.log(comment);
    await comments.update(
    { comment: comment },
    {
        where: {
        id: id,
        },
    },
    );   
    res.redirect('/');
})

app.post('/delete/:id', async function(req, res){
    const {id} =   req.params;
    console.log(id);
    await comments.destroy({
    where: {
        id: id,
    },
    });
    res.redirect('/');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

