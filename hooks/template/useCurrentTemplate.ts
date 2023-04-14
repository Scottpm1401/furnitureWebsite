import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { TemplateType } from '../../models/template';
import { useAppDispatch } from '../../redux/hooks';
import { actions } from '../../redux/reducer';
import { getCurrentTemplate } from '../../services/template';

const useCurrentTemplate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [template, setTemplate] = useState<TemplateType>();
  const { t } = useTranslation();
  const toast = useToast();

  const getTemplate = useCallback(async () => {
    try {
      const currentTemplate = await getCurrentTemplate();
      setTemplate(currentTemplate);
      dispatch(actions.global.setTemplate(currentTemplate));
      return currentTemplate;
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, t, toast]);

  useEffect(() => {
    getTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    template,
  };
};

export default useCurrentTemplate;
