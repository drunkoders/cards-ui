/* eslint-disable max-lines */
import { Dimensions } from '@models/Dimensions';
import { UnoCard, UnoCardColor } from '@models/UnoCard';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { UnoBackFace } from './faces/UnoBackFace';
import { UnoFace0 } from './faces/UnoFace0';
import { UnoFace1 } from './faces/UnoFace1';
import { UnoFace2 } from './faces/UnoFace2';
import { UnoFace3 } from './faces/UnoFace3';
import { UnoFace4 } from './faces/UnoFace4';
import { UnoFace5 } from './faces/UnoFace5';
import { UnoFace6 } from './faces/UnoFace6';
import { UnoFace7 } from './faces/UnoFace7';
import { UnoFace8 } from './faces/UnoFace8';
import { UnoFace9 } from './faces/UnoFace9';
import { UnoFaceJump } from './faces/UnoFaceJump';
import { UnoFaceReverse } from './faces/UnoFaceReverse';
import { UnoFacePlus2 } from './faces/UnoFacePlus2';
import { UnoFaceJoker } from './faces/UnoFaceJoker';
import { UnoFacePlus4 } from './faces/UnoFacePlus4';

export const UnoCardDimensions: Dimensions = {
  width: 242.107,
  height: 362.769,
};

interface UnoCardFaceProps {
  /** Card to be displayed. If not given, displays the back face of card */
  card?: UnoCard;
  /** Additionnal style to apply to the svg */
  className?: string;
}

const useStyles = createUseStyles({
  svgCard: {
    width: '100%',
    userSelect: 'none',
    position: 'absolute',
  },
});

const colors: { [key in UnoCardColor]: string } = {
  red: '#f55',
  yellow: '#fa0',
  blue: '#55f',
  green: '#0a0',
};

export const UnoCardFace: React.FC<UnoCardFaceProps> = ({ card, className }) => {
  const classes = useStyles();
  const unoFace = useMemo(() => {
    const fill = card ? colors[card.color] : '';
    switch (card?.value) {
      case '0':
        return <UnoFace0 fill={fill} />;
      case '1':
        return <UnoFace1 fill={fill} />;
      case '2':
        return <UnoFace2 fill={fill} />;
      case '3':
        return <UnoFace3 fill={fill} />;
      case '4':
        return <UnoFace4 fill={fill} />;
      case '5':
        return <UnoFace5 fill={fill} />;
      case '6':
        return <UnoFace6 fill={fill} />;
      case '7':
        return <UnoFace7 fill={fill} />;
      case '8':
        return <UnoFace8 fill={fill} />;
      case '9':
        return <UnoFace9 fill={fill} />;
      case 'jump':
        return <UnoFaceJump fill={fill} />;
      case 'reverse':
        return <UnoFaceReverse fill={fill} />;
      case 'plus2':
        return <UnoFacePlus2 fill={fill} />;
      case 'plus4':
        return <UnoFacePlus4 />;
      case 'joker':
        return <UnoFaceJoker />;
      default:
        return <UnoBackFace />;
    }
  }, [card]);

  return (
    <svg
      className={classNames(className, classes.svgCard)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 242.107 362.979"
    >
      {unoFace}
    </svg>
  );
};
