# tarefas-redis-background-redis

Redis pelo docker

```shell
systemctl start docker
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Iniciar a aplicação

```shell
yarn init -y

yarn add express nodemailer dotenv
yarn add nodemon sucrase -D
```

Criar arquivo nodemon.json na raiz do projeto

```json
{
    "execMap": {
        "js": "sucrase-node"
    }
}
```

package.json

```json
{
  "name": "tarefas-redis-background-redis",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/rogerlog/tarefas-redis-background-redis.git",
  "author": "Roger <logroger@gmail.com>",
  "license": "MIT",
  "scripts": {
    "start": "nodemon src/server.js"
  },
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "nodemailer": "^6.4.17"
  },
  "devDependencies": {
    "nodemon": "^2.0.7",
    "sucrase": "^3.17.1"
  }
}
```

Criar src/server.js

```js
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log(`Server running on the ${process.env.PORT}`)
});
```

Variáveis de ambiente .env

```env
PORT=8080
```

Testando a aplicação

```shell
yarn start
```

Criando pasta src/app/controllers/UserController.js

```js
export default {
    async StorageEvent(req, res) {
        const {name, email} = req.body;

        const user = {
            name,
            email, password: '123'
        };

        return res.json(user);
    }
}
```

Adicionando a biblioteca `password-generator`

```shell
yarn add password-generator
```

Criação do arquivo /src/app/lib/Mail.js

Ferramenta para envio de email

mailtrap.io

Arquivo UserController.js

```js
import passwordGenerator from 'password-generator';
import Mail from '../lib/Mail';

export default {
    async StorageEvent(req, res) {
        const {name, email} = req.body;

        const user = {
            name,
            email, 
            password: passwordGenerator(15, false)
        };

        await Mail.sendMail({
            from: 'ROGER <rogerlog@id.uff.br>',
            to: `${name} <${email}>`,
            subject: 'Cadastro de Usuário',
            html: `Olá, ${name}, bem-vindo!`
        })

        return res.json(user);
    }
}
```

No postman enviar POST

http://localhost:8080/users

```json
{
    "name": "Roger",
    "email": "logroger@gmail.com"
}
```

Criar fila no Redis

Bull

```shell
yarn add bull
yarn add bull-board
```

Monitorar falhas

https://sentry.io/welcome/

