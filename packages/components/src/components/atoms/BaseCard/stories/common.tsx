import React from 'react';

import { Meta, Story } from '@storybook/react';
import { BaseCard, BaseCardProps } from '../BaseCard';

export const defaultStoryTemplate: Story<BaseCardProps> = ({ width = 100, height = 120, ...args }) => (
  <BaseCard width={width} height={height} {...args} />
);

export const defaultStoryArgs: Partial<BaseCardProps> = {
  faceUp: true,
};

export const defaultStoryMetaFactory: (meta: Partial<Meta>) => Meta = (meta) => ({
  title: `Atoms/BaseCard/${meta.title}`,
  component: BaseCard,
  args: defaultStoryArgs,
  argTypes: {
    ...meta.argTypes,
    frontFace: { control: { disable: true } },
    backFace: { control: { disable: true } },
  },
});
