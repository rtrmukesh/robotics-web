export type UserList = {
  id: string;
  email: string;
  name: string | null;
  created_at: string; // or Date (based on API)
  role_id: number | null; // if FK optional
  is_active: boolean;
  avatar_url: string | null;
};
