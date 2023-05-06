import {
  ExtendedDateFormatRule,
  OffsetUnitsConverter,
} from '../types/time.types';

const offsetUnitConverters: OffsetUnitsConverter = {
  s: (amount: number) => 1000 * amount, // seconds to milli
  m: (amount: number) => 60000 * amount, // minutes to milli
  h: (amount: number) => 3600000 * amount, // hours to milli
  d: (amount: number) => 86400000 * amount, // days to milli
  M: (amount: number) => 2629743830 * amount, // months to milli
  y: (amount: number) => 31556926000 * amount, // years to milli
};

const TIME_DIFF_REGEXP = /([-+]?\d+)([smhdy]{1})/;

function getTimeOffset(time: Date, offsetExpr: string): Date {
  const match = TIME_DIFF_REGEXP.exec(offsetExpr);
  let dateOffset: Date;
  if (match) {
    const [offset, offsetUnit] = [parseInt(match[1], 10), match[2]];
    dateOffset = new Date(
      time.getTime() + offsetUnitConverters[offsetUnit](offset)
    );
  }
  return dateOffset;
}

export function formatReducer(
  currentFormat: string,
  extendedFormatRule: ExtendedDateFormatRule
): string {
  const { from, until, format, now, time } = extendedFormatRule;
  const fromTime = from ? getTimeOffset(now, from) : null;
  const untilTime = until ? getTimeOffset(now, until) : null;

  let selectedFormat: string;

  // from & until are given and the range is valid
  if (fromTime && untilTime && fromTime <= untilTime) {
    console.log('here');
    selectedFormat =
      fromTime <= time && time <= untilTime ? format : currentFormat;
  } else if (fromTime && !untilTime) {
    // until is missing. check if current time is after fromTime
    selectedFormat = fromTime <= time ? format : currentFormat;
  } else if (!fromTime && untilTime) {
    // from is missing. check if current time is before untilTime
    selectedFormat = time <= untilTime ? format : currentFormat;
  } else if (!(fromTime && untilTime)) {
    // both, from & until are missing. just take the given format.
    selectedFormat = format;
  } else {
    console.error(`Invalid time range [${from} - ${until}].`);
  }
  return selectedFormat;
}
