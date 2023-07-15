// getting details that are stored in local storage
export const getDetailsFromLocalStorage = (key) => {
  if (['user-details', 'cart-items'].includes(key)) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : [];
  }
  return localStorage.getItem(key) || '';
};

//setting details in local storage
export const setDetailsInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const parseJWT = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const forgetPasswordDetailsJSON = [
  {
    id: 0,
    name: 'Email',
    iconName: 'fas fa-envelope',
    placeholder: 'Enter a email',
    value: '',
    type: 'text',
    invalidMessage: 'Please enter a email',
    successMessage: 'Email sent successfully',
    buttonMessage: 'Sent an Email'
  },
  {
    id: 1,
    name: 'Enter a OTP',
    iconName: 'fas fa-key',
    placeholder: 'Enter a otp',
    value: '',
    type: 'text',
    invalidMessage: 'Please enter a otp',
    successMessage: 'OTP Validate successfully',
    buttonMessage: 'Validate OTP'
  },
  {
    id: 2,
    name: 'Password',
    iconName: 'fas fa-lock',
    placeholder: 'Enter a password',
    value: '',
    type: 'password',
    invalidMessage: 'Please enter a password',
    successMessage: 'Password changed successfully',
    buttonMessage: 'Change Password',
  },
  {
    id: 3,
    name: 'Confirm Password',
    iconName: 'fas fa-lock',
    placeholder: 'Enter a confirm password',
    value: '',
    invalidMessage: 'Please enter a confirm password'
  },
]