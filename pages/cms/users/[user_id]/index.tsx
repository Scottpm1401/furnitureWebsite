import React from 'react';

import { useUser } from '../../../../hooks/useUser';

type Props = {};

const CmsUser = (props: Props) => {
  const { user, isLoading } = useUser();

  return <div>{user?.displayName}</div>;
};

export default CmsUser;
