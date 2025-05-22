import React, { useEffect } from 'react';

function PageTitle(Component: React.ComponentType, title: string) {
  return function ComponentContaienr() {
    useEffect(() => {
      document.title = title;
    }, []);
    return <Component />;
  };
}

export default PageTitle;
