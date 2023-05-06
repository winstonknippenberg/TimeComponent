import { ReactNode } from 'react';

export type TimeFormatOption =
  | 'time-or-date-or-full-by-date'
  | 'time-or-full-by-date'
  | 'time'
  | 'date'
  | 'relative'
  | string
  | DateFormatRule[];

export interface TimeProps {
  label?: string;
  timeZone?: string;
  time: string | Date;
  format?: TimeFormatOption;
  className?: string;
  withSeparator?: boolean;
  separator?: 'line' | 'dot';
}

export type OffsetUnitsConverter = {
  s: OffsetConverter;
  m: OffsetConverter;
  h: OffsetConverter;
  d: OffsetConverter;
  M: OffsetConverter;
  y: OffsetConverter;
};

export interface DateFormatRule {
  from?: string;
  until?: string;
  format: string;
}

export interface ExtendedDateFormatRule extends DateFormatRule {
  now: Date;
  time: Date;
}

type OffsetConverter = (amount: number) => number;
