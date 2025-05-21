export interface User {
  id?: string;
  email: string;
  name: string;
  avatar: string | null;
  registerDate?: Date;
  postCount: number;
  subscriberCount: number;
}
