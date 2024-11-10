// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
  location: string | null;
  email: string;
  company: string | null;
  bio: string | null;
}