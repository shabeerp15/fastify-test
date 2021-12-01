// create a fastify server
const fastify = require('fastify')({
    logger: true,
})

// fastify swagger
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'Fastify API' },
    },
})

// register the routes
fastify.register(require('./routes/itemsRoute.js'))

const PORT = process.env.PORT || 5000
// Run the server!
const start = async () => {
    try {
        await fastify.listen(PORT)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
