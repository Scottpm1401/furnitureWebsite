import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TemplateType } from '../../models/template';
import { getTemplate } from '../../services/template';

const useTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState<TemplateType>();
  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToast();
  const templateId = useMemo(
    () => router.query.template_id?.toString(),
    [router.query.template_id]
  );

  const getTemplateById = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const templatesList = await getTemplate(id);
        setTemplate(templatesList);
      } catch (err) {
        if (isAxiosError(err))
          toast({
            title: t(err.response?.data.message),
            status: 'error',
            duration: 5000,
            position: 'top-right',
          });
      } finally {
        setIsLoading(false);
      }
    },
    [t, toast]
  );

  useEffect(() => {
    if (!templateId) return;
    getTemplateById(templateId);
  }, [getTemplateById, templateId]);

  return {
    isLoading,
    template,
    getTemplateById,
  };
};

export default useTemplate;
