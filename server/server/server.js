const express = require('express');
const cors    = require('cors');
 
class Server{
    constructor(){
        this.app      = express();
        this.port     = 4000;
        this.paths={
            transaction: '/api/transaction'
        }
        this.middlewares();
        this.routes();
        this.execute()
    }

    middlewares(){
        this.app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.transaction, require('../routes/transaction'));
    }

    execute(){

        this.app.listen( this.port, () => {
            console.log(`Server is running on port ${ this.port }`)
        } )
    }
}

module.exports = Server;