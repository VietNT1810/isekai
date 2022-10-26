const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const { G_CLIENT_ID, G_CLIENT_SECRET, G_REFRESH_TOKEN, ADMIN_EMAIL } =
  process.env;

const oauth2client = new OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  G_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

const sendEmailReset = async (to, url, text, name) => {
  oauth2client.setCredentials({
    refresh_token: G_REFRESH_TOKEN,
  });
  const accessToken = oauth2client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: G_CLIENT_ID,
      clientSecret: G_CLIENT_SECRET,
      refreshToken: G_REFRESH_TOKEN,
      accessToken,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: '"Isekai webapp" <civickunde99@gmail.com>', // sender address
      to, // list of receivers
      subject: "Isekai Webapp Account Password Reset", // Subject line
      text: "Hello world?", // plain text body
      html: `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
      <title>Passioncorners | Account Activation</title>
      <style>
        body {
          background-color: #333333;
          height: 100vh;
          font-family: "Roboto", sans-serif;
          color: #fff;
          position: relative;
          text-align: center;
        }
        .container {
          max-width: 700px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
        .wrapper {
          padding: 0 15px;
        }
        .card {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        span {
          color: #04c4d9;
        }
        button {
          padding: 1em 6em;
          border-radius: 5px;
          border: 0;
          background-color: #04c4d9;
          transition: all 0.3s ease-in;
          cursor: pointer;
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
        }
        button:hover {
          background-color: #00a8ba;
          transition: all 0.3s ease-in;
        }
        .spacing {
          margin-top: 5rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="wrapper">
          <div class="card">
            <h1><span>Xin chào</span> ${name}</h1>
            <p>Vui lòng bấm nút bên dưới để thay đổi mật khẩu 👀</p>
            <a href=${url}><button>${text}</button></a>
            <p class="spacing">
              Nếu nút trên không hoạt động, vui lòng điều hướng đến liên kết được cung cấp bên dưới 👇🏻
            </p>
            <div>${url}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
    },
    (err, info) => {
      if (err) return { err };
      return info;
    }
  );
};

module.exports = { sendEmailReset };
