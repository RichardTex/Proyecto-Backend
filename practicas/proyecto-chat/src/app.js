import { Router, express } from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const router = Router();
const app = express();
const httpServer = app.listen(8080, () => console.log('Listening on port 8080'));
const io = new Server(httpServer);

app.engine('handlers', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlerbars');

app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);

io.on('connection', socket => {
    console.log('')
})


export default router;