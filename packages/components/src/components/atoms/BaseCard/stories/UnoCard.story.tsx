import { UnoCardFace } from '@atoms/UnoCardFace';
import { AllUnoColors, AllUnoValues, UnoCard, UnoCardColor, UnoCardValue } from '@models/UnoCard';
import { Meta, Story } from '@storybook/react';
import { defaultCardStyleFactory } from '@utils/card-style';
import React from 'react';
import { BaseCard, BaseCardProps } from '../BaseCard';
import { defaultStoryMetaFactory } from './common';

interface UnoCardStoryProps extends BaseCardProps {
  /** Control for storybook: indicates the uno card name */
  cardValue: UnoCardValue;
  /** Control for storybook: indicates the color of the card */
  cardColor: UnoCardColor;
}

export const UnoCardExample: Story<UnoCardStoryProps> = ({ cardValue, cardColor, ...args }) => {
  const unoCard: UnoCard = { type: 'UnoCard', id: '1', value: cardValue, color: cardColor };
  const playingCardStyle = defaultCardStyleFactory(unoCard, { width: 1000, height: 1000 });
  const baseCardArgs: BaseCardProps = {
    width: playingCardStyle.dimensions.width,
    height: playingCardStyle.dimensions.height,
    frontFace: <UnoCardFace card={unoCard} />,
    backFace: <UnoCardFace />,
    ...args,
  };
  return <BaseCard {...baseCardArgs} />;
};
UnoCardExample.args = {
  cardValue: '3',
  cardColor: 'green',
};

const meta: Meta = defaultStoryMetaFactory({
  title: 'Uno Card',
  argTypes: {
    cardValue: {
      control: {
        type: 'select',
        options: AllUnoValues,
      },
    },
    cardColor: {
      control: {
        type: 'select',
        options: AllUnoColors,
      },
    },
  },
});
export default meta;
