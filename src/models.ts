export type Member = {
  lastName: string;
  firstName: string;
  gender: string;
  admissionYear: number;
  faculty: string;
  highschool: string;
  positions: string[];
  oldPositions: string[];
};

export type OBMessage = {
  obMessageId: number;
  year: number;
  fileName: string;
  title: string;
};

export type AnnualSchedule = {
  date: string;
  title: string;
  description: string | null;
}[];

export type PracticeSchedule = {
  dow: string;
  normal: string;
  holiday: string;
}[];

export type SantamaResult = {
  fileName: string;
  title: string;
  year: number;
}[];

export type LeagueResult = {
  year: string;
  m: string;
  w: string;
}[];

export type Pages = { [key: string]: { title: string; description: string } };

export type Content = {
  annualSchedule: AnnualSchedule;
  leagueResult: LeagueResult;
  members: Member[];
  obMessages: OBMessage[];
  pages: Pages;
  practiceSchedule: PracticeSchedule;
  santamaResult: SantamaResult;
};
