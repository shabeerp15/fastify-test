const { v4: uuidv4 } = require('uuid')
let items = require('../Items.js')

const getItems = (req, reply) => {
    reply.send(items)
}

const getItem = (req, reply) => {
    const item = items.find((item) => item.id === req.params.id)
    if (item) {
        reply.send(item)
    } else {
        reply.code(404).send({ message: 'Item not found' })
    }
}

const addItem = (req, reply) => {
    const { name, price, quantity } = req.body
    const item = {
        id: uuidv4(),
        name,
        price,
        quantity,
    }
    items = [...items, item]
    reply.code(201).send(item)
}

const deleteItem = (req, reply) => {
    const item = items.find((item) => item.id === req.params.id)
    if (item) {
        items = items.filter((item) => item.id !== req.params.id)
        reply.send(`Item ${req.params.id} has been removed`)
    } else {
        reply.code(404).send({ message: 'Item not found' })
    }
}  

const updateItem = (req, reply) => {
    const item = items.find((item) => item.id === req.params.id)
    if (item) {
        const { name, price, quantity } = req.body
        item.name = name
        item.price = price
        item.quantity = quantity
        reply.send(item)
    } else {
        reply.code(404).send({ message: 'Item not found' })
    }
}

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem
}
