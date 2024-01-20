import moment from 'moment';

export const dateFormat = (date: any) => {
  return moment(date).format('DD MMM, YYYY');
};

export const dateTime = (date: any) => {
  return moment(date).format('DD/MM/YYYY,  h:mm a');
};

export const dayMonthYearSlash = (date: any) => {
  return moment(date).format('DD/MM/YYYY');
};

export const dayMonthYearSlashWithToday = (date: any) => {
  const targetDate: any = moment(date);
  const today: any = moment();
  if (targetDate.isSame(today, 'd')) {
    return 'Today';
  } else {
    const yesterday = today.subtract(1, 'days').startOf('day');
    if (targetDate.isSame(yesterday, 'd')) {
      return 'Yesterday';
    }
    const tomorrow = moment().add(1, 'days').startOf('day');
    if (targetDate.isSame(tomorrow, 'd')) {
      return 'Tomorrow';
    }
  }
  return targetDate.format('DD/MM/YYYY');
};

export const dateWithMonth = (date: any) => {
  return moment(date).format('DD/MM');
};

export const dateWithMonthWithHour = (date: any) => {
  return moment(date).format('DD/MM, h:mm a');
};

export const timeFormat = (date: any) => {
  return moment(date).format('h:mm a');
};

export const dateTimeFromNow = (date: any) => {
  return moment(date).fromNow();
};

export const secondToHours = (secs: any) => {
  return moment.utc(secs * 1000).format('HH:mm:ss');
};
// export const dateTimeFormat = (date: any) => {
//     return moment(date).format('MMM DD, YYYY, h:mm a');
// };
