export type CourseRow = {
  /** Banner assigned ID for a course */
  id: number;
  errorTriggered: boolean;

  /** Full title of the course */
  title: string;
  /** 3 letter ID for course subject. PHY = Physics, COP = Comupter Programming, etc.. */
  subject: string;
  /** Description of the subject ID */
  subjectDesc: string;
  /** The number portion of course titles CGS-1000 */
  courseNumber: number;
  /** Usually has been 0, not sure of the purpose */
  sectionNumber: number;

  /** Number of credit hours */
  creditHours: number;
  /** Course Registration Number. Uniquely identifies a section. */
  crn: number;
  /** The term it takes place. 'Season YYYY'. e.g. Spring 2025, Fall 2027, Summer 2026 */
  term: string;

  /** Array of instructors */
  instructor: Instructor[];

  /** Array of all meeting times */
  meetings: Meeting[];

  /** The campus course is hosted at */
  campus: string;

  /** Status of the section at time of scraping */
  status: CourseStatus;

  scheduleType: string;
  /** List of attributes assigned to the course */
  attributes: string[];

  /** Sections that are linked to this one */
  linked: string[];
};

export type Instructor = {
  name: string;
  email?: string;
  /** Primary instructor for the course (some have secondary instructors) */
  isPrimary: boolean;
};

export type Meeting = {
  /** Day of the meeting */
  days: MeetingDays;

  /** The start time of the course meeting */
  startTime: Time24Hour;
  /** The end time of the course meeting */
  endTime: Time24Hour;

  /** e.g. Class, Breakout */
  type: string;

  /** Building the meeting takes place. Is online if building is "Online" and room is "None" */
  building: string;
  /** Room number */
  room: string;
  /** Whether the class is online */
  isOnline: boolean;

  startDate: ParsedDate;
  endDate: ParsedDate;
};

export type CourseStatus = {
  isFull: boolean;
  seatsRemaining: number;
  totalSeats: number;
  waitlistRemaining: number;
  waitlistTotal: number;
}

export type Time24Hour = {
  hour: HourNumber,
  minute: MinuteNumber,
}

export type HourNumber = NumberInRange<0, 23>;
export function asHourNumber(value: number): HourNumber {
  return inRange(value, 0, 23);
}

export type MinuteNumber = NumberInRange<0, 60>;
export function asMinuteNumber(value: number): MinuteNumber {
  return inRange(value, 0, 60);
}

export type ParsedDate = {
  year: number,
  month: MonthNumber,
  day: DayNumber,
}

export type DayNumber = NumberInRange<1, 31>;
export function asDayNumber(value: number): DayNumber {
  return inRange(value, 1, 31);
}

export type MonthNumber = NumberInRange<1, 12>;
export function asMonthNumber(value: number): MonthNumber {
  return inRange(value, 1, 12);
}

// Following Range types taken from: https://dev.to/56_kode/advanced-number-typing-in-typescript-4cli
// Type to represent a number in a range
type NumberInRange<Min extends number, Max extends number> = number & {
  __brand: `NumberInRange<${Min}, ${Max}>`;
};

// Function to validate that a number is in a range
function inRange<Min extends number, Max extends number>(
  value: number, 
  min: Min, 
  max: Max
): NumberInRange<Min, Max> {
  if (value >= min && value <= max) {
    return value as NumberInRange<Min, Max>;
  }
  throw new Error(`Value ${value} is not in range [${min}, ${max}]`);
}

export const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type MeetingDay = typeof DAYS_OF_WEEK[number];
export type MeetingDays = MeetingDay[];

export function isMeetingDay(day: string): day is MeetingDay {
  return (DAYS_OF_WEEK as readonly string[]).includes(day);
}