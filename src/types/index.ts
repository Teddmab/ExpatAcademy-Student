export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: number;
}