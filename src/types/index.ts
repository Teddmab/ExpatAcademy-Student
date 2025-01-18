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

export interface University {
  id: number;
  name: string;
  country: string;
  city: string;
  logo: string;
  tuition: {
    min: number;
    max: number;
    currency: string;
  };
  degrees: string[];
  ranking: number;
  acceptanceRate: string;
  description: string;
  website: string;
}

export interface UniversityFilters {
  search: string;
  tuitionRange: string;
  degreeType: string;
  location: string;
  page: number;
}