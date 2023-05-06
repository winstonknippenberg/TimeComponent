import { DateFormatRule, TimeFormatOption } from '../types/time.types';

import { formatReducer } from './formatReducer';

export const MACHINE_READABLE_FORMAT = "yyyy-MM-dd'T'HH:mm:ssxxx";

const StringParserWithCalculation = {
  'time-or-date-or-full-by-date': (time: Date, now: Date) => {
    const timeOrDateOrFullformatArray = [
      {
        from: '0h',
        until: '4h',
        format: 'HH:mm',
      },
      {
        from: '4h',
        until: '1w',
        format: 'dd.MM.yyyy HH:mm',
      },
      {
        from: '1w',
        format: 'dd.MM.yyyy',
      },
    ];
    return getFormatFromArray(time, timeOrDateOrFullformatArray, now);
  },
  'time-or-full-by-date': (time: Date, now: Date) => {
    const timeOrFullFormatArray = [
      {
        from: '-1w',
        format: 'dd.MM.yyyy HH:mm',
      },
      {
        from: '-10h',
        until: '-1h',
        format: 'HH:mm',
      },
    ];
    return getFormatFromArray(time, timeOrFullFormatArray, now);
  },
};

const StringParserWithoutCalculation = {
  date: 'yyyy-MM-dd',
  time: 'HH:mm',
};

export const _getFormatting = (time: Date, format: TimeFormatOption) => {
  const now = new Date(Date.now());
  if (typeof format === 'string') {
    return getFormatFromString(time, format, now);
  }
  if (format instanceof Array) {
    return getFormatFromArray(time, format, now);
  }
};

const getFormatFromString = (time: Date, format: string, now: Date): string => {
  if (StringParserWithCalculation[format]) {
    return StringParserWithCalculation[format](time, now);
  }
  if (StringParserWithoutCalculation[format]) {
    return StringParserWithoutCalculation[format];
  }
  return format;
  // switch (format) {
  //   case 'time-or-date-or-full-by-date':
  //     const timeOrDateOrFullformatArray = [
  //       {
  //         from: '-1w',
  //         format: 'dd.MM.yyyy',
  //       },
  //       {
  //         from: '-4h',
  //         until: '-1w',
  //         format: 'dd.MM.yyyy HH:mm',
  //       },
  //       {
  //         from: '-4h',
  //         until: '-1h',
  //         format: 'HH:mm',
  //       },
  //     ];
  //     return getFormatFromArray(time, timeOrDateOrFullformatArray, now);

  //   case 'time-or-full-by-date':
  //     const timeOrFullFormatArray = [
  //       {
  //         from: '-1w',
  //         format: 'dd.MM.yyyy HH:mm',
  //       },
  //       {
  //         from: '-10h',
  //         until: '-1h',
  //         format: 'HH:mm',
  //       },
  //     ];
  //     return getFormatFromArray(time, timeOrFullFormatArray, now);

  //   case 'time':
  //     return 'HH:mm';

  //   case 'date':
  //     return 'yyyy-MM-dd';

  //   // case 'relative':
  //   //   selectedFormat = getRelativeTime(now.getTime() - time.getTime());
  //   //   break;
  //   default:
  //     return format;
  // }
};

const getFormatFromArray = (
  time: Date,
  format: DateFormatRule[],
  now: Date
) => {
  const selectedFormat = format
    .map((rule) => ({ ...rule, now, time }))
    .reduceRight(formatReducer, MACHINE_READABLE_FORMAT);
  return selectedFormat;
};
