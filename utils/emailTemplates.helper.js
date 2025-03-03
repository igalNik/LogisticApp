/**
 * Generates an HTML email template for password reset in Hebrew.
 * @param {Object} user - User object with firstName and other fields.
 * @param {string} resetUrl - URL for password reset link.
 * @returns {string} - HTML string for email body.
 */
const passwordResetTemplateGreen = (user, resetUrl) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; direction: rtl; text-align: right;">
      <h2 style="color: #2F4F2F;">בקשת איפוס סיסמה</h2>
      <p>שלום${user.firstName ? ' ' + user.firstName : ''},</p>
      <p>קיבלנו בקשה לאיפוס הסיסמה שלך ב-LogisticApp. לחץ על הכפתור למטה כדי לאפס אותה:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2F4F2F; color: white; text-decoration: none; border-radius: 5px;">איפוס סיסמה</a>
      <p style="margin-top: 20px;">קישור זה יפוג בעוד 10 דקות. אם לא ביקשת זאת, התעלם מהמייל הזה.</p>
      <p>תודה,<br>צוות LogisticApp</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #777;">זקוק לעזרה? צור קשר ב-support@logisticapp.com</p>
    </div>
`;

const passwordResetTemplateBlue = (user, resetUrl) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; direction: rtl; text-align: right;">
      <h2 style="color:  #1a73e8;">בקשת איפוס סיסמה</h2>
      <p>שלום${user.firstName ? ' ' + user.firstName : ''},</p>
      <p>קיבלנו בקשה לאיפוס הסיסמה שלך ב-LogisticApp. לחץ על הכפתור למטה כדי לאפס אותה:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color:  #1a73e8; color: white; text-decoration: none; border-radius: 5px;">איפוס סיסמה</a>
      <p style="margin-top: 20px;">קישור זה יפוג בעוד 10 דקות. אם לא ביקשת זאת, התעלם מהמייל הזה.</p>
      <p>תודה,<br>צוות LogisticApp</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #777;">זקוק לעזרה? צור קשר ב-support@logisticapp.com</p>
    </div>
`;

module.exports = { passwordResetTemplateGreen, passwordResetTemplateBlue };
