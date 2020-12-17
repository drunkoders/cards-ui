import React from 'react';

import { defaultStoryTemplate, defaultStoryMetaFactory } from './common';

export const PureExample = defaultStoryTemplate.bind({});
PureExample.args = {
  frontFace: <div>Front face</div>,
  backFace: <div>Back face</div>,
};

export default defaultStoryMetaFactory({ title: 'Pure' });
