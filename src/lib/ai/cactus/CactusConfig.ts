import { CactusConfig } from 'cactus-react-native';

CactusConfig.telemetryToken = process.env.CACTUS_TELEMETRY_TOKEN;
CactusConfig.cactusToken = process.env.CACTUS_TOKEN;

export const CACTUS_MODE = 'hybrid';

export const VISION_CONFIG = {
    model: 'lfm2-vl-450m',
    contextSize: 2048,
};

export const CACTUS_CONFIG = {
    model: 'lfm2-1.2b',
    contextSize: 2048,
};

export const performOneShot = false;
