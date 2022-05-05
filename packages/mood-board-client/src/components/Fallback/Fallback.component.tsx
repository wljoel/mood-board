import type { PropsWithChildren } from 'react';
import React from 'react';

interface FallbackProps {
  title: string;
  subtitle: string;
}

const Fallback: React.FC<PropsWithChildren<FallbackProps>> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col items-center rounded-2xl border-emerald-200 p-10">
      <h3 className="m-0">{title}</h3>
      <h4 className="mt-1">{subtitle}</h4>
      {children}
    </div>
  );
};

export default Fallback;
