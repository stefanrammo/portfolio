function isEmpty(value) {
return !value || value.trim() === '';
}

function userCredsAreValid(email, password) {
    return email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 8
}

function userDetailsAreValid(
  email,
  password,
  full_name,
  street,
  zip_code,
  city
) {
  return (
    userCredsAreValid(email, password) &&
    !isEmpty(full_name) && 
    !isEmpty(street) && 
    !isEmpty(zip_code) && 
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = { userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed };