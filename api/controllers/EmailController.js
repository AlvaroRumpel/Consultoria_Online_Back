const nodemailer = require('nodemailer');

const emailProductionSettings = {
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: true
}

const emailTestSettings = (testAccount) => (
    {
        host: 'smtp.ethereal.email',
        auth: testAccount
    }
)

async function createEmailSettings() {
    if(process.env.NODE_ENV === 'production'){
        return emailProductionSettings();
    }
    const testAccount = await nodemailer.createTestAccount();
    return emailTestSettings(testAccount);
}

class Email {
    async sendEmail() {
        const emailSettings = await createEmailSettings();
        const transporter = nodemailer.createTransport(emailSettings);
    
        const info = await transporter.sendMail(this);
    
        if(process.env.NODE_EN !== 'production') {
            console.log('URL: '+ nodemailer.getTestMessageUrl(info));
        }
    }

}

class ChecksEmail extends Email {
    constructor(user, address) {
        super();
        this.from = '"Consultoria Esportiva Online" <noreply@consultoriaesportiva.com.br>';
        this.to = user.email;
        this.subject = 'Vericação de E-mail', 
        this.text = `Olá ${user.name}! Verifique seu e-mail aqui: ${address}`,
        this.html = `<h1>Olá ${user.name}!</h1><p>Verifique seu e-mail aqui: <a href="${address}">${address}</a></p>`
    }
}

class ForgotPassEmail extends Email {
    constructor(user, address) {
        super();
        this.from = '"Consultoria Esportiva Online" <noreply@consultoriaesportiva.com.br>';
        this.to = user.email;
        this.subject = 'Alteração de senha', 
        this.text = `Olá ${user.name}! Altere sua senha aqui: ${address}`,
        this.html = `<h1>Olá ${user.name}!</h1><p>Altere sua senha aqui: <a href="${address}">${address}</a></p>`
    }
}

module.exports = {
    ChecksEmail,
    ForgotPassEmail
}