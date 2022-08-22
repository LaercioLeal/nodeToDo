const Express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

const startConnection = require('./database').startConnection();

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors({
    methods: ['GET', 'POST']
}));


app.listen(process.env.SERVER_PORT, async () => {
    await startConnection;
    routes(app);
    console.log("Server online on port", process.env.SERVER_PORT);
});