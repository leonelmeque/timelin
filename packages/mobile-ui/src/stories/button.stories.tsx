import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button } from '../index';
import { CenterView } from '../../storybook/decorators';

storiesOf('Button', module)
  .addDecorator(CenterView)
  .add('primary', () => (
    <Button variant="primary" size="md" label="Normal Button" />
  ))
  .add('secondary', () => (
    <Button variant="secondary" size="md" label="Weird Button" />
  ));
