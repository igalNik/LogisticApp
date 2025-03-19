const crypto = require('crypto');
const bcrypt = require('bcryptjs');

async function isCorrectPassword(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

function changedPasswordAfter(JWTTimestamp) {
  const changedTimeStamp = parseInt(
    this?.passwordChangedAt?.getTime() / 1000,
    10
  );
  if (!changedTimeStamp) return false;

  return changedTimeStamp > JWTTimestamp;
}

function createPasswordResetToken() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 100; // 10 minutes

  return resetToken;
}

module.exports = {
  isCorrectPassword,
  changedPasswordAfter,
  createPasswordResetToken,
};
