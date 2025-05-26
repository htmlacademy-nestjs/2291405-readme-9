export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  registerDate?: Date;
  postCount?: number;
  subscriberCount?: number;
}
