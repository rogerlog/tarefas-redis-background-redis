import Mail from '../lib/Mail';

export default {
    key: 'RegistrationMail',
    options: {
        delay: 5000,
        priority: 3
    },
    async handler({ data }) {
        const { user } = data;

        await Mail.sendMail({
            from: 'ROGER <rogerlog@id.uff.br>',
            to: `${user.name} <${email}>`,
            subject: 'Cadastro de Usuário',
            html: `Olá, ${user.name}, bem-vindo!`
        })
    }
}