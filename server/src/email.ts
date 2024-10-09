import { EMAIL_ADDRESS } from './config.js';
import { EmailAddressObject } from './interfaces/auth/auth-interface.d.js';
import { CreateEmail } from './interfaces/email/email-interface.d.js';

export const createEmail = ({ to, subject, html }: CreateEmail) => {
  const fromEmailAddress = 'Pinterest Clon ' + '<' + `${EMAIL_ADDRESS}` + '>';

  const email = {
    from: fromEmailAddress,
    to,
    subject,
    html,
  };

  return email;
};

export const recoverAccountEmail = async ({
  emailAddress,
}: EmailAddressObject) => {
  const recoverAccountEmailHTML = `
  <main>
  <section>
  <header>
    <img style="width: 50px;" src="https://pngimg.es/d/pinterest_PNG63.png" alt="Pinterest logo"/>
    <h1> We receive your request </h1>
    <strong> Now you can reset your password. </strong>
  </header>
  <br />
    <a href="http://localhost:1234/pinterest-clon-api/auth/reset-password/${emailAddress}" target="_blank" 
      rel="noreferrer">
      Reset password
    </a>
      <p> Didn't you ask to change the password? You can ignore this email. </p>
    <footer>
      <aside>Created By: Agustín Gil, Santino Steckler | Pinterest Clon</aside>
      <small>Unofficial Pinterest account</small>
    </footer>
</section>
</main>
  `;

  try {
    const recoverAccountEmail = createEmail({
      to: `${[emailAddress]}`,
      subject: 'Reset password on Pinterest Clon',
      html: recoverAccountEmailHTML,
    });

    return recoverAccountEmail;
  } catch (err) {
    throw new Error('Internal error!');
  }
};

export const twoFactorAuthenticationEmail = async ({
  emailAddress,
}: EmailAddressObject) => {
  try {
    const twoFactorAuthenticationEmail = createEmail({
      to: `${[emailAddress]}`,
      subject: '',
      html: '',
    });

    return twoFactorAuthenticationEmail;
  } catch (err) {
    throw new Error('Internal error!');
  }
};
