const express = require('express');
const body_parser = require('body-parser');

const mailjet = require('node-mailjet').connect('e91e63d5d11b52a9c6049ff6a750a52f', 'f858e62111e013e60962e1f74593ad33');

const app = express();
const port = 3000;

app.use(body_parser.urlencoded({ extended: true }));

app.get('/send-email', (req, res) => {
    console.log("*****");
    console.log(req.query);
    console.log("*****");
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": req.query.correo,
                        "Name": req.query.nombre
                    },
                    "To": [
                        {
                            "Email": "diana.261111@gmail.com",
                            "Name": "Diana Gonzalez"
                        }
                    ],
                    "Subject": req.query.asunto,
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": `<p>${req.query.mensaje}</p>`,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            res.send(result.body)
        })
        .catch((err) => {
            res.send(err.statusCode)
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
