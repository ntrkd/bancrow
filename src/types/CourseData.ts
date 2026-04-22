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
  sequenceNumber: number;

  /** Number of credit hours */
  creditHours: number;
  /** Course Registration Number. Uniquely identifies a section. */
  crn: string;
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

  /** Whether there are any sections that are linked to this one */
  linked?: boolean;
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

  startTime: TimeString;
  /** The end time of the course meeting */
  endTime: TimeString;

  /** e.g. Class, Breakout */
  type: string;

  /** Building the meeting takes place. If online is "Online" and room is "None" */
  building: string;
  /** Room number */
  room?: string;

  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
};

export type CourseStatus = {
  isFull: boolean;
  seatsRemaining: number;
  totalSeats: number;
  waitlistRemaining: number;
  waitlistTotal: number;
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

// Helper types to define what two digits looks like
export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type TwoDigits = `${Digit}${Digit}`;

/** 24 Hour Time. Ex. 12:15, 15:45 */
export type TimeString = `${TwoDigits}:${TwoDigits}`;

export function isMeetingDay(day: string): day is MeetingDay {
  return (DAYS_OF_WEEK as readonly string[]).includes(day);
}