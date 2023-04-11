import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { TemplateType } from '../../models/template';
import { getAllTemplate } from '../../services/template';

const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<TemplateType[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const getTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const templatesList = await getAllTemplate();
      setTemplates(templatesList);
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
  }, [t, toast]);

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  return {
    isLoading,
    templates,
    getTemplates,
  };
};

export default useTemplates;
