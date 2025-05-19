export interface User {
  id?: string;
  email: string;
  name: string;
  avatar: string | null;
  registerDate: Date;
  postCount: number | null;
  subscriberCount: number | null;
}
