import { DependencyContainer } from "tsyringe";
import { WelcomeScreen } from "./views";
import { FeatureMetadata } from "@/lib/domain/types";

const feature: FeatureMetadata = {
    name: 'welcome',
    entryComponent: WelcomeScreen,
    hooks: [],
    screens: { index: WelcomeScreen },
    init: (container: DependencyContainer) => {
        container.register('WelcomeScreen', { useValue: WelcomeScreen })
    }
}

export default feature