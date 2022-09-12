export interface userInterface {
  id?: string;
  name: string;
  password: string;
  email: string;
  is_adm?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
}

export interface jwtUserInterface {
  id: string;
  name: string;
  password: string;
  email: string;
  is_adm: boolean;
  created_at: boolean;
  updated_at: boolean;
}

export interface categoryInterface {
  id?: string;
  name: string;
}

export interface loginInterface {
  email: string;
  password: string;
}
