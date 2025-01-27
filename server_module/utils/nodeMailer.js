const nodemailer = require('nodemailer');

 const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "68d1df99e09cc1",
    pass: "3539a0e7685a31"
  }
});

exports.generateOTP = () => {
  let otp = '';

  for (let i = 0; i < 4; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp += randVal;
  }
  return otp;
};
exports.sendWelcomeEmail = (user) => {
  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to MD Care</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                background-color: #4CAF50;
                color: #ffffff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .content {
                padding: 20px;
                color: #333333;
            }
            .welcome {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777777;
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #4CAF50;
                border-radius: 5px;
                text-decoration: none;
                font-size: 16px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Welcome to MD Care, ${user.fullname}!</h2>
            </div>
            <div class="content">
                <p>Hello <strong>${user.fullname}</strong>,</p>
                <p class="welcome">We're excited to have you join the MD Care family!</p>
                <p>
                    At MD Care, we are dedicated to providing you with the best tools and resources for managing your healthcare and wellness journey.
                </p>
                <p>Get started today and explore all the features MD Care has to offer.</p>
                <p>
                    If you have any questions or need help, feel free to reach out to our support team. We're here to assist you every step of the way.
                </p>
                <p>Warm regards,</p>
                <p>The MD Care Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} MD Care. All rights reserved.</p>
                <p><a href="#">Unsubscribe</a> | <a href="#">Contact Support</a></p>
            </div>
        </div>
    </body>
    </html>
    `;



  transport.sendMail({
    from: "no-reply@mdcare.com",
    to: user.email,
    subject: `Welcome to MD Care, ${user.fullname}!`,
    html: htmlContent,
  }, (err, info) => {
    if (err) {
      console.error('Error sending welcome email:', err.message);
    } else {
      console.log('Welcome email sent successfully:', info.messageId);
    }
  });
};

exports.sendResetPasswordEmail = (user, resetLink) => {
  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                background-color: #f44336;
                color: #ffffff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .content {
                padding: 20px;
                color: #333333;
            }
            .reset {
                font-size: 20px;
                font-weight: bold;
                color: #f44336;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777777;
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #f44336;
                border-radius: 5px;
                text-decoration: none;
                font-size: 16px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Reset Your Password</h2>
            </div>
            <div class="content">
                <p>Hello <strong>${user.fullname}</strong>,</p>
                <p class="reset">We received a request to reset your password.</p>
                <p>Click the button below to reset your password:</p>
                <p>
                    <a href="${resetLink}" class="button">Reset Password</a>
                </p>
                <p>If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.</p>
                <p>This reset link is valid for 1 hour.</p>
                <p>Best regards,</p>
                <p>The MD Care Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} MD Care. All rights reserved.</p>
                <p><a href="#">Unsubscribe</a> | <a href="#">Contact Support</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

  transport.sendMail(
    {
      from: "no-reply@mdcare.com",
      to: user.email,
      subject: "Password Reset Request",
      html: htmlContent,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending reset password email:", err.message);
      } else {
        console.log("Reset password email sent successfully:", info.messageId);
      }
    }
  );
};
