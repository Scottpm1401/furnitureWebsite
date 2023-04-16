import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from '../../models/api/cms';
import { commonResponse } from '../../models/common';
import { TemplateType } from '../../models/template';

export const getAllTemplate = async () => {
  const res = await axiosClient.get(API.TEMPLATE.GETALL);
  return res.data as TemplateType[];
};

export const getTemplate = async (id: string) => {
  const res = await axiosClient.get(API.TEMPLATE.GETTEMPLATE(id));
  return res.data as TemplateType;
};

export const getCurrentTemplate = async () => {
  const res = await axiosClient.get(API.TEMPLATE.CURRENTTEMPLATE);
  return res.data as TemplateType;
};

export const createTemplate = async (template: CreateTemplateRequest) => {
  const res = await axiosClient.post(API.TEMPLATE.CREATETEMPLATE, template);
  return res.data as TemplateType;
};

export const activeTemplate = async (id: string) => {
  const res = await axiosClient.post(API.TEMPLATE.ACTIVETEMPLATE(id));
  return res.data as TemplateType;
};

export const updateTemplate = async (
  id: string,
  template: UpdateTemplateRequest
) => {
  const res = await axiosClient.patch(
    API.TEMPLATE.UPDATETEMPLATE(id),
    template
  );
  return res.data as TemplateType;
};

export const deleteTemplate = async (id: string) => {
  const res = await axiosClient.delete(API.TEMPLATE.DELETETEMPLATE(id));
  return res.data as commonResponse;
};
