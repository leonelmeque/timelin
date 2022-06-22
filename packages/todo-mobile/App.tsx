import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text as RNText, View } from "react-native";
import styled from "styled-components/native";
import {useGreetings} from "@todo/commons"
import Button from "./src/components/atoms/Button";

const _Hello = ({ style, message}: { style?: any, message:string }) => {
    return (
        <View style={style}>
            <Text>{message}</Text>
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
   const greetings = useGreetings({whoToGreet:"Meque"});
    return (
        <View style={styles.container}>
            <Hello message={greetings} />
            <StatusBar style="auto" />
            <Button label="Button" size="md" variant="primary" onPress={()=>alert("React Native Button")} />
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
