import { CactusConfig } from 'cactus-react-native';

CactusConfig.telemetryToken = '92ce1e2d-72d5-4835-9232-37583dad2117';
// CactusConfig.cactusToken = 'AIzaSyBUMolfYcgWgagq6cm2-jAPgPoYy8H_4uw';
// CactusConfig.cactusToken = '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';
CactusConfig.cactusToken = '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';

export const CACTUS_MODE = 'hybrid';

export const VISION_CONFIG = {
    model: 'lfm2-vl-450m',
    //contextSize: 2048,
};

export const CACTUS_CONFIG = {
    model: 'lfm2-1.2b',
    //contextSize: 2048,
};

export interface Prompt {
    model: string;
    options: any;
    system: string;
    user: string | null;
    assistant: string | null;
}


export const END_TOKEN = '<|im_end|>';
export const performOneShot = false;
