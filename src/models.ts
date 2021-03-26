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
  obMessageId: string;
  year: number;
  fileName: string;
  title: string;
};
