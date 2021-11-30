// ************** USERS ENDPOINTS ********

// ************** USERS CRUD ********

// GET /authors => returns the list of authors
// GET /authors/123 => returns a single author
// POST /authors => create a new author
// PUT /authors/123 => edit the author with the given id
// DELETE /authors/123 => delete the author with the given id

import express from 'express'
import fs from 'fs'
import { fileURLToPath } from "url" 
import { dirname, join } from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()
const currentFilePath = fileURLToPath(import.meta.url)
const currentFolder = dirname(currentFilePath)
const authorsJSON = join(currentFolder, 'authors.json')
// 1. 
authorsRouter.get('/', (req, response) =>{
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   response.send(authors)

})
// 2.
authorsRouter.get('/:authorsId', (req, response) =>{
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   const authorId = req.params.authorId
   const Author = authors.find(author => author.id === authorId)
   response.send(Author)
} )
// 3.
authorsRouter.post('/', (req, response) =>{
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   const newUser = {...req.body, id: uniqid()}
   authors.push(newUser)
   fs.writeFileSync(authorsJSON, JSON.stringify(authors))
   response.status(201).send(newUser)    
} )
//4.
authorsRouter.put('/:userId', (req, response) =>{
   const authors = JSON.parse(fs.readFileSync(usersJSONPath))
   const index = users.findIndex(author => author.id === req.params.authorId)
 const updatedUser = { ...users[index], ...req.body }

 users[index] = updatedUser
} )
// 5.
authorsRouter.delete('/:userId', (req, response) =>{
   response.send("hi I am A put method")
} )



export default authorsRouter











authorRoutes.get('/:authorId', (req, res) => {
   
})

authorRoutes.post('/', (req, res) => {
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   const emailExists = authors.some(author => author.email === req.body.email)
   if (emailExists) return res.status(400).send('A user with this email already exists')
   
   const newUser = {...req.body, id: uuidv4()}
   authors.push(newUser)
   fs.writeFileSync(authorsJSON, JSON.stringify(authors))
   res.status(201).send(newUser)    
})

authorRoutes.post('/checkEmail', (req, res) => {
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   const email = req.body.email
   const emailExists = authors.some(author => author.email === email)
   res.send(emailExists)
})

authorRoutes.put('/:authorId', (req, res) => {
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   const authorId = req.params.authorId
   const index = authors.findIndex(author => author.id === authorId)
   authors[index] = {...authors[index], ...req.body}
   const updatedDetails = authors[index]
   fs.writeFileSync(authorsJSON, JSON.stringify(authors))
   res.send(updatedDetails)
})

authorRoutes.delete('/:authorId', (req, res) => {
   const authors = JSON.parse(fs.readFileSync(authorsJSON))
   const authorId = req.params.authorId
   const remainingAuthors = authors.filter(author => author.id !== authorId)
   fs.writeFileSync(authorsJSON, JSON.stringify(remainingAuthors))
   res.status(204).send()
})

export default authorRoutes