import React from 'react';

import { PlayingCardBackFace } from '@atoms/PlayingCardBackFace';
import { PlayingCardFrontFace } from '@atoms/PlayingCardFrontFace';
import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { defaultCardStyleFactory } from '@utils/card-style';

import { Meta, Story } from '@storybook/react';
import { defaultStoryMetaFactory } from './common';
import { BaseCard, BaseCardProps } from '../BaseCard';

interface PlayingCardStoryProps extends BaseCardProps {
  /** Control for storybook: indicates the playing card name */
  cardName: PlayingCardName;
  /** Control for storybook: indicates the playing card suit */
  cardSuit: PlayingCardSuit;
  /** Control for storybook: indicates the color of back face */
  backFaceColor: string;
}

export const PlayingCardExample: Story<PlayingCardStoryProps> = ({ cardName, cardSuit, backFaceColor, ...args }) => {
  const playingCard: PlayingCard = { type: 'PlayingCard', id: '1', name: cardName, suit: cardSuit };
  const playingCardStyle = defaultCardStyleFactory(playingCard, { width: 1000, height: 1000 });
  const baseCardArgs: BaseCardProps = {
    width: playingCardStyle.dimensions.width,
    height: playingCardStyle.dimensions.height,
    frontFace: <PlayingCardFrontFace card={playingCard} />,
    backFace: <PlayingCardBackFace color={backFaceColor} />,
    ...args,
  };
  return <BaseCard {...baseCardArgs} />;
};
PlayingCardExample.args = {
  cardName: PlayingCardName.Ace,
  cardSuit: PlayingCardSuit.Clubs,
};

const meta: Meta = defaultStoryMetaFactory({
  title: 'PlayingCard',
  argTypes: {
    cardName: {
      control: {
        type: 'select',
        options: Object.values(PlayingCardName),
      },
    },
    cardSuit: {
      control: {
        type: 'select',
        options: Object.values(PlayingCardSuit),
      },
    },
    backFaceColor: {
      control: {
        type: 'color',
      },
    },
  },
});
export default meta;
