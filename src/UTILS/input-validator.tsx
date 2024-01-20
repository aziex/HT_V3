export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (password.length <= 5) return 'Password must be at least 6 characters.';
  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const phoneValidator = (phone: string) => {
  if (!phone || phone.length <= 0) return 'Phone number cannot be empty.';

  return '';
};

export const genderValidator = (gender: any) => {
  if (!gender || gender.length <= 0) return 'Select a gender.';

  return '';
};

export const idValidator = (id: string) => {
  if (!id || id.length <= 0) return 'ID number cannot be empty.';

  return '';
};

export const usernameValidator = (username: string) => {
  if (!username || username.length <= 0) {
    return 'Username cannot be empty.';
  } else if (username.length <= 5) {
    return 'Username length 6 characters at least.';
  }

  return '';
};

export const txtValidator = (txt: string) => {
  if (!txt || txt.trim().length <= 0) return false;

  return true;
};

export const objValidator = (obj: any) => {
  if (!obj) return false;

  return true;
};

// export const icValidation = (ic: string) => {
//   const format = /^\d{6}\d{2}\d{4}$/;
//   if (format.test(ic)) {
//     return true;
//   }
//   return false;
// };
