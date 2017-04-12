import dateFormat from 'dateformat';

export default {
  version: (context) => {
    return context.version;
  },
  date: () => {
    return dateFormat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
  }
};
