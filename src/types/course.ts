export interface Course {
  name: string;
  translation?: string;
  description: string;
  image: string;
  registrationOpen: boolean;
  registrationType: "single" | "multiple";
  registrationLink: string | RegistrationLink[];
  noticeMain?: string;
  noticeSecondary?: string;
}

interface RegistrationLink {
  label: string;
  link: string;
}
