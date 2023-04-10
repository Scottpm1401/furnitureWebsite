import {
  getSignature,
  GetSignatureType,
  uploadImage,
} from '../services/upload';

type UploadProductImageProps = {
  uploadImg: string;
  img?: string;
};

export const handleUploadTemplateImage = async ({
  uploadImg,
  img,
}: UploadProductImageProps) => {
  const formData = new FormData();
  let signatureParam: GetSignatureType = {};
  if (img) {
    const publicId = img.slice(img.indexOf('furniture'));
    signatureParam.public_id = publicId;
    formData.append('public_id', publicId);
  } else {
    const folder = `furniture/banners`;
    signatureParam.folder = folder;
    formData.append('folder', folder);
  }

  const { signature, timestamp } = await getSignature(signatureParam);
  formData.append('file', uploadImg);
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  const { public_id, version } = await uploadImage(formData);
  return version ? `/v${version}/${public_id}` : public_id;
};
