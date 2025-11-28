import type { ViewProps } from "@/lib/core/types"
import { View, Text } from "react-native"
import { GameCreationState, GameCreationAction } from "../types"
import { Button } from "@/lib/components/Button"

export const GameCreationView = ({ state, dispatch }: ViewProps<GameCreationState, GameCreationAction>) => {
    return (
        <View>
            <Text>Game Ready!</Text>
            <Text>Your spy game has been created.</Text>

            <View>
                <Button title="Share Game" onPress={() => dispatch({ type: 'FINALIZE_GAME' })} />
                <View />
                <Button title="Create Another" variant="secondary" onPress={() => dispatch({ type: 'RESET' })} />
            </View>
        </View>
    )
}