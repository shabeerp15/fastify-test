const {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem
} = require('../controllers/itemsController')

const ItemSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        quantity: { type: 'number' },
    },
}

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: ItemSchema,
            },
        },
    },
    handler: getItems,
}

const getItemOpts = {
    schema: {
        response: {
            200: ItemSchema,
        },
    },
    handler: getItem,
}

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'price', 'quantity'],
            properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                quantity: { type: 'number' },
            },
        },
        response: {
            201: ItemSchema,
        },
    },
    handler: addItem,
}

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteItem,
}

const updateItemOpts = {
    schema: {
        response: {
            200: ItemSchema,
        },
    },
    handler: updateItem,
}

function itemRoutes(fastify, options, done) {
    // Get all items
    fastify.get('/items', getItemsOpts)

    // Get single item by id
    fastify.get('/items/:id', getItemOpts)

    // Add item
    fastify.post('/items', postItemOpts)

    // Delete single item by id
    fastify.delete('/items/:id', deleteItemOpts)

    // Update single item by id
    fastify.put('/items/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes
