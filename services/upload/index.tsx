import axios from 'axios';

import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { SignedUpload } from '../../models/upload';

export type GetSignatureType = {
  public_id?: string;
  folder?: string;
};

export type UploadedImage = {
  image: string;
  data: any;
};

export const getSignature = async ({ public_id, folder }: GetSignatureType) => {
  const res = await axiosClient.post(API.UPLOAD.SIGNATURE, {
    public_id,
    folder,
  });
  return res.data as SignedUpload;
};

export const uploadImage = async (body: FormData) => {
  const res = await axiosClient.post(API.IMAGE.UPLOAD, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data as UploadedImage;
};

export const destroyImage = async (name: string) => {
  const res = await axiosClient.post(API.IMAGE.DELETE, { name });

  return res.data;
};
