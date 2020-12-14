/* istanbul ignore file */
/* eslint-disable max-lines */
import React, { FC } from 'react';

export const UnoFace1: FC<{ fill: string }> = ({ fill }) => (
  <g data-testid="UnoCard-1" className="n1" fillRule="evenodd" transform="matrix(4 0 0 4 -239 -1328.448)">
    <rect width="60" height="90" x="60" y="332.362" fill="#fff" stroke="#000" strokeWidth="0.5" rx="10" ry="10" />
    <rect width="50" height="80" x="65" y="337.362" fill={fill} rx="5" ry="5" />
    <path
      fill="#fff"
      d="M105 352.362c-22.091 0-40 17.909-40 40 0 5.523 4.477 10 10 10 22.091 0 40-17.908 40-40 0-5.523-4.477-10-10-10z"
    />
    <path fill={fill} d="M88 362.362l-5 5v6l5-5v24h5v-30z" />
    <path fill="#fff" d="M70 339.862l-2.5 2.5v3l2.5-2.5v12h2.5v-15zm40 75l2.5-2.5v-3l-2.5 2.5v-12h-2.5v15z" />
  </g>
);
