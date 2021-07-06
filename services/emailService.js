// Сервисы по отправке письма юзеру
const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')

// Создание шаблона
const createTemplate = (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: 'http://localhost:7070/' // Нужно вынести в переменные окружения
    }
  })

  const template = {
    body: {
      name: email,
      intro: 'Welcome to System Contacts! We\'re very excited to have you on board.',
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:7070/api/users/verify/${verifyToken}` // Нужно вынести в переменные окружения
        }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  }

  const emailBody = mailGenerator.generate(template)
  return emailBody
}

// Отправка письма
const sendEmail = async (verifyToken, email) => {
  const emailBody = createTemplate(verifyToken, email)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: email, // Change to your recipient
    from: 'monitor@i.ua', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    html: emailBody,
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })

  // await sgMail.send(msg) почему не работает???
}

module.exports = {
  sendEmail
}
