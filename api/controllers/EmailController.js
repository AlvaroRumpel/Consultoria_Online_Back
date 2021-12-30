const nodemailer = require('nodemailer')

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

async function createEmailSettings () {
  if (process.env.NODE_ENV === 'production') {
    return emailProductionSettings()
  }
  const testAccount = await nodemailer.createTestAccount()
  return emailTestSettings(testAccount)
}

class Email {
  async sendEmail () {
    const emailSettings = await createEmailSettings()
    const transporter = nodemailer.createTransport(emailSettings)

    const info = await transporter.sendMail(this)

    if (process.env.NODE_ENV !== 'production') {
      console.log('URL: ' + nodemailer.getTestMessageUrl(info))
    }
  };
}

class ChecksEmail extends Email {
  constructor (user, address) {
    super()
    this.from = '"Confirmação" <confirmacao.acr@gmail.com>'
    this.to = user.email
    this.subject = 'Vericação de E-mail',
    this.text = `Olá ${user.name}! Verifique seu e-mail aqui: ${address}`,
    this.html = `<header style="background:#1d1f36; display: flex; padding: 0.5em; justify-content: center">
    <h1 style="text-align: center; color: #fff; font-family: Verdana, Geneva, Tahoma, sans-serif;">Confirmação de email</h1>
</header>
<main style="background:#dbdbdb; display: flex; padding: 0.5em; align-items: center; flex-direction: column; font-family: Verdana, Geneva, Tahoma, sans-serif;">
    <h2>Olá ${user.name}, tudo bem?</h2>
    <p>Acesse o <a href="${address}" style="font-weight: bold">link</a> para confirmar seu email</p>
    <a href="${address}">${address}</a>
</main>`
  }
}

class ForgotPassEmail extends Email {
  constructor (user, address) {
    super()
    this.from = '"Confirmação" <confirmacao.acr@gmail.com>'
    this.to = user.email
    this.subject = 'Alteração de senha',
    this.text = `Olá ${user.name}! Altere sua senha aqui: ${address}`,
    this.html = `<h1>Olá ${user.name}!</h1><p>Altere sua senha aqui: <a href="${address}">${address}</a></p>`
  }
}

module.exports = {
  ChecksEmail,
  ForgotPassEmail
}
