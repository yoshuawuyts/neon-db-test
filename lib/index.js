let concat = require('concat-stream')
let pump = require('stream').pipeline

let app = require('fastify')({ logger: false })
let http = require('http');
let keepAliveAgent = new http.Agent({ keepAlive: true  });

app.get('/users', {}, (req, reply) => {
    let opts = { agent: keepAliveAgent };
    http.get("http://localhost:3030/users", opts, res => {
        pump(res, concat(buf => reply.code(200).send(JSON.parse(buf))), (err) => {
            if (err) throw err
        })
    });
})

app.get('/big', {}, (req, reply) => {
    let opts = { agent: keepAliveAgent };
    http.get("http://localhost:3030/big", opts, res => {
        pump(res, concat(buf => reply.code(200).send(JSON.parse(buf))), (err) => {
            if (err) throw err
        })
    });
})

app.listen(3000, (err, addr) => {
    if (err) throw err
    console.log(`Example app listening on port ${addr}!`)
})
