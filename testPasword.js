import bcrypt from 'bcryptjs';

const enteredPassword = '12345'; // Password entered by the user
const storedHashedPassword = '$2a$10$LOxuW5wfl92PPYeKYillROzsAGzCp8WSMRxIJXqpo/brd2a2jwWoK'; // Hashed password from the database

bcrypt.compare(enteredPassword, storedHashedPassword, (err, result) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    console.log('Password match result:', result); // Should be `true` if the password is correct
  }
});