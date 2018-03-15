import dateFormat from 'dateformat';
import config from 'config';

export default {
  version: (context) => {
    return context.version;
  },
  date: () => {
    return dateFormat(new Date(), config.componentsOptions.InjectAsComment.dateFormat);
  },
};
