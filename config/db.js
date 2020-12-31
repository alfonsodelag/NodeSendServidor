const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://alfonso:Panama11@webpersonal.bxdvq.mongodb.net/nodesend?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('DB Conectada')
    } catch (error) {
        console.log('Hubo un Error: ', error);
    }
}

module.exports = conectarDB;