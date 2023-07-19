import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAffirmationScreen = ({ navigation }) => {
    const [affirmation, setAffirmation] = useState('');

    const saveAffirmation = async () => {
        if (affirmation.trim().length === 0) {
            Alert.alert('Error', 'Please enter a non-empty affirmation.');
            return;
        }

        try {
            const customAffirmations = JSON.parse(await AsyncStorage.getItem('customAffirmations')) || [];
            customAffirmations.push(affirmation);
            await AsyncStorage.setItem('customAffirmations', JSON.stringify(customAffirmations));
            Alert.alert('Success', 'Your affirmation has been saved.');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'There was a problem saving your affirmation.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Write your affirmation"
                onChangeText={text => setAffirmation(text)}
                value={affirmation}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveAffirmation}>
                <Text style={styles.saveButtonText}>Save Affirmation</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    input: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#2ECC71',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default AddAffirmationScreen;
