import bcrypt from 'bcryptjs';

const enteredPassword = '12345'; // This should be what the user entered
const storedHash = '$2a$10$B/A7OY0/uRbUW015oacviOJylP0wva8wWo2KojaYJdTq3dIcKA2nO'; // The hash from the database

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
  if (err) {
    console.error('Error comparing password:', err);
    return;
  }
  console.log('Password match result:', result);
});