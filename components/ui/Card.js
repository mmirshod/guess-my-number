import {StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";

const Card = ({children}) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        backgroundColor: Colors.primary700,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
});