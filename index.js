require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]
const numbers = persons.length
const date = new Date()

let amount = `Phonebook has info for ${numbers} people </br> ${date}`

app.get('/', (req, res) => {
    res.send('<h1>This is a header!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    res.send(amount)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

/*
const generateId = () => {
    return Math.floor(Math.random() * Math.floor(100))
}
*/

app.post('/api/persons', (request, response) => {
    const body = request.body
   // const names = persons.map(m => m.name)

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
/*
    if (names.includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
*/
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedNumber => {
        response.json(savedNumber.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})