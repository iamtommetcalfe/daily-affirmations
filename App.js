import React, { useEffect } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import AddAffirmationScreen from './screens/AddAffirmationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import affirmations from './affirmations';

const BACKGROUND_FETCH_TASK = 'daily-affirmation-notification';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        const customAffirmations = JSON.parse(await AsyncStorage.getItem('customAffirmations')) || [];
        const allAffirmations = [...affirmations, ...customAffirmations];
        const randomAffirmation = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Daily Affirmation',
                body: randomAffirmation,
            },
            trigger: {
                hour: 9,
                minute: 0,
                repeats: true,
            },
        });

        return BackgroundFetch.Result.NewData;
    } catch (error) {
        return BackgroundFetch.Result.Failed;
    }
});

const registerBackgroundFetch = async () => {
    try {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 60 * 60 * 24, // Execute the task once a day
            stopOnTerminate: false,
            startOnBoot: true,
        });
    } catch (error) {
        console.log('Error registering background fetch task:', error);
    }
};

const requestNotificationPermissions = async () => {
    await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            provideAppNotificationSettings: true,
        },
    });
};

export default function App() {
    useEffect(() => {
        requestNotificationPermissions();
        registerBackgroundFetch();
    }, []);

    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Daily Affirmations' }} />
                <Drawer.Screen name="AddAffirmation" component={AddAffirmationScreen} options={{ title: 'Add Affirmation' }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
