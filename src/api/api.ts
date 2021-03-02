import axios from 'axios';
import { ProfileType } from '../types/types';
import { ICommon, AuthLoginType, AuthMeType, UserGetType, ProfileGetStatusType, ProfileSavePhotoType } from './apiTypes';

const instance = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': 'efb79f34-0358-41cf-89db-4e01f26ae6c2' },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<UserGetType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
  },
  follow(userId: number) {
    return instance.post<ICommon>(`follow/${userId}`).then(res => res.data.resultCode);
  },
  unfollow(userId: number) {
    return instance.delete<ICommon>(`follow/${userId}`).then(res => res.data.resultCode);
  }
}

export const authAPI = {
  me() {
    return instance.get<AuthMeType>('auth/me').then(res => res.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<AuthLoginType>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data);
  },
  logout() {
    return instance.delete<ICommon>('auth/login').then(res => res.data)
  }
}

export const profileAPI = {
  getProfile(userId: number | null) {
    if (!userId) userId = 13151
    return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
  },
  getStatus(userId: number | null) {
    if (!userId) userId = 13151
    return instance.get<ProfileGetStatusType>(`profile/status/${userId}`).then(res => res.data.status)
  },
  updateStatus(status: string) {
    return instance.put<ICommon>(`profile/status`, { status }).then(res => res.data.resultCode)
  },
  savePhoto(photoFile: any) {
    let formData = new FormData();
    formData.append('image', photoFile);

    return instance.put<ProfileSavePhotoType>('profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
  saveProfile(profileData: ProfileType) {
    return instance.put<ICommon>(`profile`, profileData).then(res => res.data)
  }
}

export const securityAPI = {
  getCaptchaURl() {
    return instance.get('security/get-captcha-url')
  }
}