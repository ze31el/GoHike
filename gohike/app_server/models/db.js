const mongoose = require('mongoose');

//const dbURI = 'mongodb://localhost:27017/gohike';
//const dbURI = 'mongodb+srv://Zeel:Zeel1234@cluster0.3gfug.mongodb.net/gohike?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://Zeel:Zeel1234@cluster0.3gfug.mongodb.net/gohike?retryWrites=true&w=majority';

//mongoose.connect(dbURI, {useNewUrlParser: true.valueOf, useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connect(dbURI, {dbName: 'gohike'});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.once('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});


process.once('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => {
        process.exit(0);
    });
});

require('./trail');