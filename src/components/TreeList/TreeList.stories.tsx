import { storiesOf } from '@storybook/react';
import React from 'react';
import { TreeList } from './TreeList';
import nameof from "ts-nameof.macro";

function Default() {
    return <>
        <TreeList />
    </>;
};

storiesOf("TreeList", module).add(nameof(Default), Default);