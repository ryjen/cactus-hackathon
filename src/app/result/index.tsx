import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen() {
    return (
        <View style={styles.container}>
            <Text>Result Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
