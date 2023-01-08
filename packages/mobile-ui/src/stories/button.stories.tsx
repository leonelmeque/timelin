import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button } from '../index';
import { CenterView } from '../../storybook/decorators';

storiesOf('Button', module)
  .addDecorator(CenterView)
  .add('Button', () => <Button />);
