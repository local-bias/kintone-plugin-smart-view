import React from 'react';
import { forwardRef } from 'react';

const ID = 'ribbit::document';

export const DocumentIconSymbol = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 20 20'
      style={{ display: 'none' }}
      ref={ref}
      {...props}
    >
      <symbol id={ID}>
        <path
          fill='currentColor'
          d='M10 2v4.5A1.5 1.5 0 0 0 11.5 8H16v8.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 16.5v-13A1.5 1.5 0 0 1 5.5 2zm1 .25V6.5a.5.5 0 0 0 .5.5h4.25z'
        ></path>
      </symbol>
    </svg>
  )
);
DocumentIconSymbol.displayName = 'DocumentIconSymbol';

export const DocumentIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20px'
      height='20px'
      viewBox='0 0 20 20'
      ref={ref}
      {...props}
    >
      <use href={`#${ID}`} />
    </svg>
  )
);
DocumentIcon.displayName = 'DocumentIcon';
