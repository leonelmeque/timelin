import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text as RNText, View } from "react-native";
import styled from "styled-components/native";

const _Hello = ({ style }: { style?: any }) => {
    return (
        <View style={style}>
            <Text>Running react native with styled components</Text>
        </View>
    );
};

const Hello = styled(_Hello)`
    background: black;
`;

const Text = styled(RNText)`
    color: white;
    color: white;
    font-size: 24px;
    margin: 12px 12px;
`;

export default function App() {
    return (
        <View style={styles.container}>
            <Hello />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
