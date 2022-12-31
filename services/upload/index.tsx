import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { SignedUpload } from '../../models/upload';

export type GetSignatureType = {
  public_id?: string;
  folder?: string;
};

export const getSignature = async ({ public_id, folder }: GetSignatureType) => {
  const res = await axiosClient.post(API.UPLOAD.SIGNATURE, {
    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
    public_id,
    folder,
  });
  return res.data as SignedUpload;
};
