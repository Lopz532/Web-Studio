
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tienda.html'));
});

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jorgelopz532@gmail.com', // cambia esto
      pass: 'kalitolopz532123456789'         // cambia esto
    }
  });

  const mailOptions = {
    from: email,
    to: 'jorgelopz532@gmail.com',
    subject: 'Nuevo mensaje de Web Studio',
    text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error al enviar el mensaje.');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.send('¡Mensaje enviado con éxito!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
