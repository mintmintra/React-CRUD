const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/db1', {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(result => console.log('Connection OK'))
.catch(err => console.log(err))

let productSchema = new mongoose.Schema({
	name: String,
	price: Number,
    detail: String,
	date_added: Date
})


let Product = mongoose.model('Product', productSchema)

module.exports = Product
