import { DependencyContainer } from "tsyringe";
import { AnimatedWelcomeScreen } from "./views";
import { FeatureMetadata } from "@/lib/domain/types";

const feature: FeatureMetadata = {
    name: 'welcome',
    entryComponent: AnimatedWelcomeScreen,
    hooks: [],
    screens: { index: AnimatedWelcomeScreen },
    init: (container: DependencyContainer) => {
        container.register('AnimatedWelcomeScreen', { useValue: AnimatedWelcomeScreen })
    }
}

export default feature