import { isNumber, isString } from 'lodash';
import moment from 'moment';

import { countries } from '../constant/country';
import { AddressType } from '../models/user';
import { destroyImage, getSignature } from '../services/upload';

export const validateEmail = (email: string) => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const formatShortDate = (date?: Date | string) => {
  return moment(date).format('l');
};

export const formatDate = (date?: Date | string) => {
  return moment(date).format('ll');
};

export const formatDateLong = (date?: Date | string) => {
  return moment(date).format('LL');
};

export const formatDateTime = (date?: Date | string) => {
  return moment(date).format('lll');
};

export const formatDateTimeLong = (date?: Date | string) => {
  return moment(date).format('LLL');
};

export const formatAddress = (address: AddressType) => {
  const { city, country, line1, line2, state } = address;
  return `${line2 ? line1 + line2 : line1}, ${state}, ${city}, ${country}`;
};

export const convertToBase64 = (file: File) => {
  return new Promise<{ result?: string; error: any }>(
    function (resolve: any, reject: any) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        resolve({
          result: e.target?.result as string | undefined,
          error: e.target?.error,
        });
      };
      reader.readAsDataURL(file);
    }.bind(this)
  );
};

export const isText = (value: React.ReactNode) => {
  return isString(value) || isNumber(value);
};

export const getCountryName = (code?: string) => {
  return countries.find((country) => country.code === code)?.name;
};

export const isReqError = (error: any) => {
  if (error.response?.data?.error?.details?.length > 0)
    return error.response.data.error.details[0].message as string;
  return undefined;
};

export const isBase64Image = (str: string): boolean => {
  try {
    const mimeType = str.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    return (
      (mimeType && mimeType.length === 2 && mimeType[1].startsWith('image/')) ||
      false
    );
  } catch (err) {
    return false;
  }
};

export const handleDeleteImage = async (img: string) => {
  const formData = new FormData();
  const publicId = img.slice(img.indexOf('furniture'));
  formData.append('public_id', publicId);
  const { signature, timestamp } = await getSignature({
    public_id: publicId,
  });
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  await destroyImage(formData);
};

export const isDevEnv = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProdEnv = () => {
  return process.env.NODE_ENV === 'production';
};
