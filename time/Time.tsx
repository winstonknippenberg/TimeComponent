import React = require('react');
import { TimeFormatOption, TimeProps } from '../types/time.types';
import { format as formatFn, isValid } from 'date-fns';
import { format as formatTzFn, utcToZonedTime } from 'date-fns-tz';
import { MACHINE_READABLE_FORMAT, _getFormatting } from './getFormatting';
import { he, enUS } from 'date-fns/locale';

const locale = he;

const timeSeparator: Record<TimeProps['separator'], string> = {
  line: '|',
  dot: '•',
};

export const Time = ({
  withSeparator = false,
  separator = 'dot',
  time,
  timeZone = 'Asia/Jerusalem',
  format = 'dd.MM.yyyy HH:mm',
}: TimeProps) => {
  // `new Date(null)`, `new Date(true)` and `new Date(false)` will produce valid dates
  const parsedDate = new Date(time || 0);
  // default time zone has been set to IST in all sites (if no different specific timeZone prop has been set)
  const fixedTime = timeZone
    ? utcToZonedTime(parsedDate, timeZone)
    : parsedDate;

  if (isValid(parsedDate)) {
    let userFormat = _getFormatting(parsedDate, format);
    if (!userFormat) {
      userFormat = MACHINE_READABLE_FORMAT;
    }
    const machineFormattedTime = timeZone
      ? formatTzFn(parsedDate, MACHINE_READABLE_FORMAT, { locale, timeZone })
      : formatFn(parsedDate, MACHINE_READABLE_FORMAT, { locale });
    const formattedTime = timeZone
      ? formatTzFn(fixedTime, userFormat, { locale, timeZone })
      : formatFn(fixedTime, userFormat, { locale });
    return (
      <time>
        {/* {machineFormattedTime} */}
        {formattedTime}
      </time>
    );
  }
  return null;
};
