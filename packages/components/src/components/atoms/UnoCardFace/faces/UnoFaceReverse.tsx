/* istanbul ignore file */
/* eslint-disable max-lines */
import React, { FC } from 'react';

export const UnoFaceReverse: FC<{ fill: string }> = ({ fill }) => (
  <g data-testid="UnoCard-Reverse" className="reverse" transform="matrix(4 0 0 4 -2639 -1328.448)">
    <rect
      width="60"
      height="90"
      x="660"
      y="332.362"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeWidth="0.5"
      rx="10"
      ry="10"
    />
    <rect width="50" height="80" x="665" y="337.362" fill={fill} fillRule="evenodd" rx="5" ry="5" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M705 352.362c-22.091 0-40 17.909-40 40 0 5.523 4.477 10 10 10 22.091 0 40-17.908 40-40 0-5.523-4.477-10-10-10z"
    />
    <path fill={fill} d="M690 361.112l2.5 2.5-10 10c-2.5 2.5-2.5 7.5 0 10l5-5 10-10 2.5 2.5v-10z" />
    <path fill={fill} d="M690 393.612l-2.5-2.5 10-10c2.5-2.5 2.5-7.5 0-10l-5 5-10 10-2.5-2.5v10z" />
    <path fill="#fff" d="M672.5 339.862l1.25 1.25-5 5c-1.25 1.25-1.25 3.75 0 5l2.5-2.5 5-5 1.25 1.25v-5z" />
    <path
      fill="#fff"
      d="M672.5 356.112l-1.25-1.25 5-5c1.25-1.25 1.25-3.75 0-5l-2.5 2.5-5 5-1.25-1.25v5zm35 42.5l1.25 1.25-5 5c-1.25 1.25-1.25 3.75 0 5l2.5-2.5 5-5 1.25 1.25v-5z"
    />
    <path fill="#fff" d="M707.5 414.862l-1.25-1.25 5-5c1.25-1.25 1.25-3.75 0-5l-2.5 2.5-5 5-1.25-1.25v5z" />
  </g>
);
