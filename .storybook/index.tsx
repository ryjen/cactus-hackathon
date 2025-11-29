import React from 'react';
import { View } from 'react-native';
import { ProgressAnimation } from '../src/features/clues-creation/views/components/ProgressAnimation';

// Simple Storybook viewer - shows the ProgressAnimation story
export default function StorybookUI() {
    return (
        <View style={{ flex: 1 }}>
            <ProgressAnimation visible={true} />
        </View>
    );
}
