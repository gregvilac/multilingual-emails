const i18next = require("i18next");
const sgMail = require("@sendgrid/mail");
const initializei18next = require("./initializeI18next.js");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTestEmail(user, preferredLanguage) {
  initializei18next(preferredLanguage);
  const subject = i18next.t("testEmail.subject");
  const preheader = i18next.t("testEmail.preheader");
  const title = i18next.t("testEmail.title");
  const content = i18next.t("testEmail.content");

  // Use SendGrid to send the email
  const msg = {
    to: user,
    from: "verified_sender@your-url.com",

    templateId: "your_dynamic_template_id",
    dynamic_template_data: {
      subject: subject,
      preheader: preheader,
      content: content,
      title: title,
    },
  };
  try {
    const sent = await sgMail.send(msg);
    // if (sent[0].statusCode === 202) {
    return sent[0].statusCode;
  } catch (error) {
    return "failed";
  }
}
module.exports = sendTestEmail;
