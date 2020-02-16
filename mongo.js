const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://puhelinluettelo:${password}@puhelinluettelo-hopos.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    Name: String,
    Number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    Name: name,
    Number: number,
})

if (process.argv.length < 4) {
    console.log('phonebook:')
    Person
    .find({})
    .then(persons => {
        console.log('jotain')
        persons.forEach(person => {
            console.log(person)
            mongoose.connection.close()
        })
        process.exit(1)  
    })
    
}

person.save().then(response => {
    console.log('number saved!');
    mongoose.connection.close();
}) 
