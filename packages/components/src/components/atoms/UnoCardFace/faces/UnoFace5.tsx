/* istanbul ignore file */
/* eslint-disable max-lines */
import React, { FC } from 'react';

export const UnoFace5: FC<{ fill: string }> = ({ fill }) => (
  <g data-testid="UnoCard-5" className="n5" transform="matrix(4 0 0 4 -1199 -1328.448)">
    <rect
      width="60"
      height="90"
      x="300"
      y="332.362"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeWidth="0.5"
      rx="10"
      ry="10"
    />
    <rect width="50" height="80" x="305" y="337.362" fill={fill} fillRule="evenodd" rx="5" ry="5" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M345 352.362c-22.091 0-40 17.909-40 40 0 5.523 4.477 10 10 10 22.091 0 40-17.908 40-40 0-5.523-4.477-10-10-10z"
    />
    <path
      fill={fill}
      d="M321 362.362v15h10c2.77 0 5 2.23 5 5s-2.23 5-5 5-5-2.23-5-5h-5c0 5.54 4.46 10 10 10s10-4.46 10-10-4.46-10-10-10h-5v-5h14v-5h-14z"
    />
    <path
      fill="#fff"
      d="M307.5 339.862v7.5h5c1.385 0 2.5 1.115 2.5 2.5s-1.115 2.5-2.5 2.5a2.495 2.495 0 01-2.5-2.5h-2.5c0 2.77 2.23 5 5 5s5-2.23 5-5-2.23-5-5-5H310v-2.5h7v-2.5h-7zm45 75v-7.5h-5a2.495 2.495 0 01-2.5-2.5c0-1.385 1.115-2.5 2.5-2.5s2.5 1.115 2.5 2.5h2.5c0-2.77-2.23-5-5-5s-5 2.23-5 5 2.23 5 5 5h2.5v2.5h-7v2.5h7z"
    />
  </g>
);
