import { UserType, PhotosType } from './../types/types';

export interface ICommon {
  resultCode: number
  messages: Array<string>
  data: {}
};


export type AuthMeType = {
  resultCode: number
  messages: Array<string>
  data: {
    id: number
    email: string
    login: string
  }
};
export type AuthLoginType = {
  resultCode: number
  messages: Array<string>
  data: {
    userId: number
  }
};


export type UserGetType = {
  items: Array<UserType>
  totalCount: number
  error: string
};


export type ProfileGetStatusType = {
  status: string
};
export type ProfileSavePhotoType = {
  resultCode: number
  messages: Array<string>
  data: PhotosType
};


export type SecurityGetCaptcha = {
  url: string
};