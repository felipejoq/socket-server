import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

// Creando el objeto server
const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Asignando base de las rutas rest y rutas de servicios
server.app.use('/', router);

server.start(() => {
    console.log(`Aquí ocurre la mágia: http://localhost:${server.port}`);
})