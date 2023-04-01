import { useCallback, useEffect, useState } from 'react';

import { TemplateType } from '../../models/template';
import { getAllTemplate } from '../../services/template';

const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<TemplateType[]>([]);

  const getTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const templatesList = await getAllTemplate();
      setTemplates(templatesList);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
