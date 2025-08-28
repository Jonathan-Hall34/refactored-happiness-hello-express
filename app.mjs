import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const PORT = process.env.PORT || 3000; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello Express from Render 😍😍😍. <a href="Jonathan">Jonathan</a>')
})

app.get('/Jonathan', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','Jonathan.html')); 
})

app.get('/api/Jonathan', (req, res) => {
  // res.send('Jonathan. <a href="/">home</a>')
  const myVar = 'Hello from server!';
  res.json({ myVar });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
