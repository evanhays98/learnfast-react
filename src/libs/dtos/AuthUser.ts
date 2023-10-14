export interface BaseEntity {
  id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  pseudo: string;
  mail: string;
}

export interface CreateUser {
  pseudo: string;
  mail: string;
  password: string;
}

export interface LoginUser {
  identifier: string;
  password: string;
}