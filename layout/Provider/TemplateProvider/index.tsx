import { useCurrentTemplate } from '../../../hooks/template';

type Props = { children: JSX.Element };

const TemplateProvider = ({ children }: Props) => {
  const { template, isLoading } = useCurrentTemplate();

  return children;
};

export default TemplateProvider;
