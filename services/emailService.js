// Сервисы по отправке письма юзеру
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
// const sgMail = require('@sendgrid/mail')

// Создание шаблона
const createTemplate = (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: 'http://localhost:7070/' // Вынести в переменные окружения?
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
          link: `http://localhost:7070/api/users/verify/${verifyToken}` // Вынести в переменные окружения?
        }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  }

  const emailBody = mailGenerator.generate(template)
  return emailBody
}

// Отправка письма через Gmail
const sendEmail = async (verifyToken, email) => {
  const emailBody = createTemplate(verifyToken, email)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'soviularg3@gmail.com',
      pass: process.env.GMAIL_PASS
    }
  })

  const mailOptions = {
    from: 'soviularg3@gmail.com',
    to: email,
    subject: 'Please confirm your email - System Contacts',
    html: emailBody
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error(`Smth wrong with email service: ${error.response}`)
  }
}

// Отправка письма через Sendgrid - рабочий запасной вариант
// const sendEmail = async (verifyToken, email) => {
//   const emailBody = createTemplate(verifyToken, email)

//   sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//   const msg = {
//     to: email, // Change to your recipient
//     from: 'monitor@i.ua', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     html: emailBody,
//   }

//   await sgMail.send(msg)
// }

module.exports = {
  sendEmail
}
