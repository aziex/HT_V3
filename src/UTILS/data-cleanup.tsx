export const filters_Cleanup = (obj: any) => {
  if (obj) {
    const newObj: any = {};
    const parseObj = JSON.parse(obj);
    Object.keys(parseObj).map((key: any) => {
      if (key != 'search') {
        const newValue = Object.keys(parseObj[key]).join();
        if (newValue.trim().length != 0) {
          newObj[key] = Object.keys(parseObj[key]).join();
        }
      } else {
        newObj[key] = parseObj[key];
      }
    });
    if (Object.keys(newObj).length == 0) {
      return;
    }
    return newObj;
  } else {
    return null;
  }
};
