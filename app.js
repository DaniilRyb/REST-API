const express = require('express')
const path = require("path")
//const {v4} = require('uuid')
const app = express()

 CONTACTS = [
    {id: v4(), name: 'Name1', surname: 'Surname1', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name2', surname: 'Surname2', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name3', surname: 'Surname3', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name4', surname: 'Surname4', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name5', surname: 'Surname5', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name6', surname: 'Surname6', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name7', surname: 'Surname7', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name8', surname: 'Surname8', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name9', surname: 'Surname9', description: 'Do something...', marked: false},
    {id: v4(), name: 'Name10', surname: 'Surname10', description: 'Do something...', marked: false}
] // импровизированная БД

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
    //console.log(CONTACTS)
})

// POST
app.post('/api/contacts', (req, res) => {
    const contact = { id: v4(),...req.body, marked: false }
    CONTACTS.push(contact)
    console.log(CONTACTS)
    res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts:id', (req, res) => {
    let con = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json(con)
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log("Server has been started on port 3000..."))
