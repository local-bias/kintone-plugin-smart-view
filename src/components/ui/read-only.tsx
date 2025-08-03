import { cn } from '@/lib/utils';
import { css } from '@emotion/css';
import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'div'> {}

const Readonly = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        className,
        css`
          box-sizing: border-box;
          color: oklch(0.707 0.022 261.325);
          padding: 16.5px 14px;
          min-height: 56px;
          border: 1px solid oklch(0.928 0.006 264.531);
          border-radius: 4px;
          background-color: oklch(0.985 0.002 247.839);
        `
      )}
    >
      {children}
    </div>
  );
});
Readonly.displayName = 'Readonly';

export default Readonly;
