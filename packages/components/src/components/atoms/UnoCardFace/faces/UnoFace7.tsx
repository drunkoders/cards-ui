/* istanbul ignore file */
/* eslint-disable max-lines */
import React, { FC } from 'react';

export const UnoFace7: FC<{ fill: string }> = ({ fill }) => (
  <g data-testid="UnoCard-7" className="n7" fillRule="evenodd" transform="matrix(4 0 0 4 -1679 -1328.448)">
    <rect width="60" height="90" x="420" y="332.362" fill="#fff" stroke="#000" strokeWidth="0.5" rx="10" ry="10" />
    <rect width="50" height="80" x="425" y="337.362" fill={fill} rx="5" ry="5" />
    <path
      fill="#fff"
      d="M465 352.362c-22.091 0-40 17.909-40 40 0 5.523 4.477 10 10 10 22.091 0 40-17.908 40-40 0-5.523-4.477-10-10-10z"
    />
    <path fill={fill} d="M441.5 362.362v10h5v-5h10l-10 25h5l10-25v-5z" />
    <path
      fill="#fff"
      d="M427.5 339.862v5h2.5v-2.5h5l-5 12.5h2.5l5-12.5v-2.5zm45 75v-5H470v2.5h-5l5-12.5h-2.5l-5 12.5v2.5z"
    />
  </g>
);
