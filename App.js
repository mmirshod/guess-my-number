import {useCallback, useEffect, useState} from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import Colors from "./constants/Colors";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync('open-sans', require('./assets/fonts/OpenSans-Regular.ttf'));
                await Font.loadAsync('open-sans-bold', require('./assets/fonts/OpenSans-Bold.ttf'));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    const pickedNumberHandler = pickedNumber => {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    };

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;
    const gameOverHandler = numberOfRounds => {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }
    const startNewGameHandler = () => {
        setUserNumber(null);
        setGuessRounds(0);
    }

    userNumber
        ? screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
        : <StartGameScreen />;
    gameIsOver && userNumber
        ? screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onReStart={startNewGameHandler}/>
        : <StartGameScreen />;


    return (
        <LinearGradient style={styles.rootScreen} colors={[ Colors.primary700, Colors.accent500]}>
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode={'cover'}
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>
                    { screen }
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
