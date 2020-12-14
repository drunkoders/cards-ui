/* istanbul ignore file */
/* eslint-disable max-lines */
import React, { FC } from 'react';

export const UnoFace4: FC<{ fill: string }> = ({ fill }) => (
  <g data-testid="UnoCard-4" className="n4" transform="matrix(4 0 0 4 -959 -1328.448)">
    <rect
      width="60"
      height="90"
      x="240"
      y="332.362"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeWidth="0.5"
      rx="10"
      ry="10"
    />
    <rect width="50" height="80" x="245" y="337.362" fill={fill} fillRule="evenodd" rx="5" ry="5" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M285 352.362c-22.091 0-40 17.909-40 40 0 5.523 4.477 10 10 10 22.091 0 40-17.908 40-40 0-5.523-4.477-10-10-10z"
    />
    <path fill={fill} d="M268.8 362.362l-9.8 20v5h12v5h5v-5h3v-5h-3v-10h-5v10h-6.8l9.8-20z" />
    <path
      fill="#fff"
      d="M252.3 339.862l-4.9 10v2.5h6v2.5h2.5v-2.5h1.5v-2.5h-1.5v-5h-2.5v5H250l4.9-10zm35.2 75l4.9-10v-2.5h-6v-2.5h-2.5v2.5h-1.5v2.5h1.5v5h2.5v-5h3.4l-4.9 10z"
    />
  </g>
);
