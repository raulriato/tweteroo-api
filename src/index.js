import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const tweets = [];
const users = [];

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.send('Todos os campos são obrigatórios!')
    }

    users.push({
        id: users.length + 1,
        username,
        avatar
    });

    res.send("Ok!")
})

server.get('/tweets', (req, res) => res.send(tweets.slice(-10)));

server.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

    if (!username || !tweet) {
        return res.send('Todos os campos são obrigatórios!')
    }

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.send('Usuário não encontrado');
    }

    tweets.push({
        ...user,
        id: tweets.length + 1,
        tweet
    })

    res.send("Ok!")
})

server.listen(5000, () => console.log('listening on port 5000'));