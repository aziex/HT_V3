export const setLang = (lang: string) => {
  try {
    localStorage.setItem('lang', lang);
    return lang;
  } catch (error) {
    return false;
  }
};

export const getLang = () => {
  try {
    const value = localStorage.getItem('lang');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return false;
  }
};

export const setIsDarkTheme = (theme: string) => {
  try {
    localStorage.setItem('is_dark_theme', theme);
    return theme;
  } catch (error) {
    return false;
  }
};

export const getIsDarkTheme = () => {
  try {
    const value = localStorage.getItem('is_dark_theme');
    if (value !== null) {
      if (value === 'false') {
        return false;
      }
      if (value === 'true') {
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const setIsAutoTheme = (theme: string) => {
  try {
    localStorage.setItem('is_auto_theme', theme);
    return theme;
  } catch (error) {
    return false;
  }
};

export const getIsAutoTheme = () => {
  try {
    const value = localStorage.getItem('is_auto_theme');
    if (value !== null) {
      if (value === 'false') {
        return false;
      }
      if (value === 'true') {
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const setUserToken = (token: string) => {
  try {
    localStorage.setItem('user_token', token);
    return token;
  } catch (error) {
    return false;
  }
};

export const getUserToken = () => {
  try {
    const value = localStorage.getItem('user_token');
    if (value !== null) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const deleteUserToken = () => {
  localStorage.removeItem('user_token');
};
