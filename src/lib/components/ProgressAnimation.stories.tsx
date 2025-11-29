import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { ProgressAnimation } from './ProgressAnimation';

const meta = {
    title: 'Components/ProgressAnimation',
    component: ProgressAnimation,
    argTypes: {
        visible: {
            control: 'boolean',
            description: 'Controls whether the animation is visible',
        },
    },
    args: {
        visible: true,
    },
} satisfies Meta<typeof ProgressAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        visible: true,
    },
};

export const Hidden: Story = {
    args: {
        visible: false,
    },
};
