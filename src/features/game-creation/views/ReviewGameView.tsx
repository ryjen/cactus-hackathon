import { View, Button, Text } from "react-native"
import type { GameCreationState, GameCreationAction } from "../types"
import type { ViewProps } from "@/lib/core/types"

export const ReviewGameView = ({ state, dispatch }: ViewProps<GameCreationState, GameCreationAction>) => {
    return (
        <View>
            <Text>Review Game</Text>
            <Button title="Share Game" onPress={() => dispatch({ type: 'FINALIZE_GAME' })} />
            <View />
            <Button title="Create Another" onPress={() => dispatch({ type: 'RESET' })} />
        </View>
    )
}