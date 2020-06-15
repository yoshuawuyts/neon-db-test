let app = require('fastify')({ logger: false })

let http = require('http');
let keepAliveAgent = new http.Agent({ keepAlive: true  });

app.get('/users', {}, (req, reply) => {
    let opts = { agent: keepAliveAgent };
    http.get("http://localhost:3030/users", opts, res => {
        reply.code(200).send(res);
    });
})

app.get('/big', {}, (req, reply) => {
    let opts = { agent: keepAliveAgent };
    http.get("http://localhost:3030/big", opts, res => {
        reply.code(200).send(res);
    });
})

app.listen(3000, (err, addr) => {
    if (err) throw err
    console.log(`Example app listening on port ${addr}!`)
})
