const express = require('express')
const app = express()
const Product = require('./model')
const port = 8000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api/db/create', (request, response) => {
    let form = request.body
    let data = {
        name: form.name || '', 
        price: form.price || 0, 
        detail: form.detail || '',
        date_added: new Date(Date.parse(form.date_added)) || new Date()
    }

    Product.create(data, err => {
        if (!err) { 
            console.log('document saved')
            response.send(true) 
        } else {
            console.log(err)
            response.send(false) 
        }  
    })
})

app.get('/api/db/read', (request, response) => {
    Product
        .find()
        .exec((err, docs) => {
            response.json(docs)
        })
})

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})