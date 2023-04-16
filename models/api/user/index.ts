import { UserInfoType } from '../../user';

export type UpdateSelfUserRequest = {
  displayName?: String;
  username?: string;
  birthday?: string;
  info?: UserInfoType;
};
