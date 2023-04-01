import { useCallback, useEffect, useState } from 'react';

import { TemplateType } from '../../models/template';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import { getCurrentTemplate } from '../../services/template';

const useCurrentTemplate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const storedTemplate = useAppSelector(selectors.global.selectTemplate);
  const [template, setTemplate] = useState<TemplateType>();

  const getTemplate = useCallback(async () => {
    try {
      const currentTemplate = await getCurrentTemplate();
      setTemplate(currentTemplate);
      dispatch(actions.global.setTemplate(currentTemplate));
      return currentTemplate;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!storedTemplate._id) {
      getTemplate();
    } else {
      setTemplate(storedTemplate);
      setIsLoading(false);
    }
  }, [getTemplate, storedTemplate]);

  return {
    isLoading,
    template,
  };
};

export default useCurrentTemplate;
