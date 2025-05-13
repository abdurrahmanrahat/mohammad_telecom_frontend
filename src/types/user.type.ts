export type TUser = {
  name: string;
};

export type TResponseUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  exp: number;
  iat: number;
};
