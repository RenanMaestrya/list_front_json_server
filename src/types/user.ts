export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "editor" | "user";
  city: string;
  country: string;
  active: boolean;
  createdAt: string;
}
