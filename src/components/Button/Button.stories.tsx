import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';

function Default() {
  return <></>;
}

function Primary() {
  return <></>;
}

storiesOf('Button', module)
  .add(nameof(Default), Default)
  .add(nameof(Primary), Primary);
