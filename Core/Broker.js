class MessageBroker {

    constructor(queue) {
        this.queue = queue;
    }

    send(type, action, message) {

        if(process.env.NODE_ENV == 'test') return;

        return new Promise( (resolve, reject) => {
            this.connection = require('amqplib').connect('amqp://localhost');
            // Publisher
            this.connection.then(conn => {
                return conn.createChannel();
            }).then(ch => {
                ch.assertQueue(this.queue).then(ok => {

                    const payload = JSON.stringify({
                        type,
                        action,
                        payload: message
                    });

                    const result = ch.sendToQueue(this.queue, new Buffer(payload));
                    resolve(result);
                });
            }).catch( (error) => {
                console.warn(error);
                reject(error);
            });
        })
    }

    // async read() {
    //     const message = await this.connection.then(conn => {
    //         return conn.createChannel();
    //     }).then(ch => {
    //         return ch.assertQueue(this.queue).then(ok => {
    //             return ch.consume(this.queue, msg => {
    //                 if (msg !== null) {
    //                     const savedMessage = msg;
    //                     ch.ack(msg);
    //                     return savedMessage.content.toString();
    //                 }
    //             });
    //         });
    //     })

    //     return message;
    // }
}

//new MessageBroker('tasks').send('Hello again');
//(async () => console.log(await new MessageBroker('tasks').read()))();

module.exports = MessageBroker;