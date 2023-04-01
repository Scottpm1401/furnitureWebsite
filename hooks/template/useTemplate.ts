import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TemplateType } from '../../models/template';
import { getTemplate } from '../../services/template';

const useTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState<TemplateType>();
  const router = useRouter();
  const templateId = useMemo(
    () => router.query.template_id?.toString(),
    [router.query.template_id]
  );

  const getTemplateById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const templatesList = await getTemplate(id);
      setTemplate(templatesList);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
