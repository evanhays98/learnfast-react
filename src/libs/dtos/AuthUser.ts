export interface BaseEntity {
  id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ANONYMOUS = 'ANONYMOUS',
  BETA = 'BETA',
  ADMIN = 'ADMIN',
}

export interface User extends BaseEntity {
  pseudo: string;
  mail: string;
  role: Role[];
}

export interface UserAccessToken extends BaseEntity {
  accessToken: string;
  userInfo: User;
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

export class UpdateUserDto {
  pseudo?: string;
  mail?: string;
}

