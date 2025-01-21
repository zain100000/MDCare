export const validateName = name => {
  if (!name) {
    return 'Name is required';
  }
  if (name.length < 4) {
    return 'Name must be at least 4 characters long';
  }
  return '';
};

export const validateEmail = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = password => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 4) {
    return 'Password must be at least 4 characters long';
  }
  return '';
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Confirm Password is required';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateFields = fields => {
  const validationFunctions = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  };

  const errors = {};

  Object.keys(fields).forEach(field => {
    if (validationFunctions[field]) {
      const error = validationFunctions[field](fields[field]);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

export const isValidInput = fields => {
  console.log('Validating fields: ', fields);
  const errors = validateFields(fields);
  console.log('Validation errors: ', errors);

  return Object.values(errors).every(error => error === '');
};
