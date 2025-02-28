// packages/shared/src/types/index.ts
export enum Subject {
  ENGLISH = 'English Language',
  MOTHER_TONGUE = 'Mother Tongue Language',
  MATHEMATICS = 'Mathematics',
  SCIENCE = 'Science',
  ART = 'Art',
  MUSIC = 'Music',
  PHYSICAL_EDUCATION = 'Physical Education',
  SOCIAL_STUDIES = 'Social Studies',
  CHARACTER_CITIZENSHIP = 'Character and Citizenship'
}

export enum Level {
  PRIMARY_1 = 'Primary 1',
  PRIMARY_2 = 'Primary 2',
  PRIMARY_3 = 'Primary 3',
  PRIMARY_4 = 'Primary 4',
  PRIMARY_5 = 'Primary 5',
  PRIMARY_6 = 'Primary 6'
}

export interface Teacher {
  id: string;
  name: string;
  subject: Subject;
  email: string;
  contactNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: string;
  level: Level;
  name: string;
  formTeacherId: string;
  createdAt: Date;
  updatedAt: Date;
}