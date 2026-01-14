import express from 'express'
import cors from 'cors'

const app = express()

let comments = [];

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs') 

app.get('/',async function(req, res){
    
    res.render('index', { comments: comments});
})

app.post('/create', (req, res) => {
  console.log(req.body)
  const { comment } = req.body;
  comments.push(comment);
  console.log(comments);
  res.redirect('/');
})


app.post('/delete', (req, res) => {
  const { comment } = req.body;
  comments.pop(comment);
  console.log(comments);
  res.redirect('/');
})

app.post('/update', (req, res) => {
  const { comment } = req.body;
  comments.pop(comment);
  console.log(comments);
  res.redirect('/');
})


app.get('/user/:id', (req, res) => {
    const q = req.query
    console.log(q)
    console.log(q.a)
    console.log(q.b)
    res.send(q)

})


app.get('/dog', (req, res) => {
  res.send({'sound':'멍멍'})
})

app.get('/cat', (req, res) => {
  res.send({'sound':'야옹'})
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})