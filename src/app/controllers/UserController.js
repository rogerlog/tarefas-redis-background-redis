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