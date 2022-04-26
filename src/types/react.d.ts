import React from 'react';

declare module 'react' {
  /** classNameを追加したファンクションコンポーネント型 */
  type FCX<P = Record<string, unknown>> = React.FunctionComponent<
    P & { className?: string; children: React.ReactNode }
  >;

  /** classNameを追加した子コンポーネントを含まないファンクションコンポーネント型 */
  type VFCX<P = Record<string, unknown>> = React.VFC<P & { className?: string }>;
}
