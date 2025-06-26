import React, { Fragment, PropsWithChildren, ReactNode } from 'react';

interface ConditionalRenderProps {
  condition: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

const ConditionalRender = ({
  condition,
  fallback = null,
  children,
}: PropsWithChildren<ConditionalRenderProps>) => {
  return condition ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Fragment>{fallback}</Fragment>
  );
};

export { ConditionalRender };
