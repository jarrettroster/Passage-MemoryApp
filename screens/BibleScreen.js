import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { getEsvText } from '../utils/api';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'GoudyBookletter1911': require('../screens/assets/fonts/GoudyBookletter1911.ttf'),
  });
};

const BibleScreen = ({ route }) => { // Accept the navigation route as a prop
  const { bookTitle } = route.params || {}; // Extract the book title from the route params
  console.log(bookTitle);
  const [passageText, setPassageText] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const fetchPassage = async () => {
      if (!bookTitle) {
        return; // Exit early if bookTitle is not provided
      }

      try {
        const text = await getEsvText(bookTitle); // Use the getEsvText function
        setPassageText(text);
      } catch (error) {
        setPassageText('Error: Failed to fetch passage');
      }
    };

    const loadAppFonts = async () => {
      await Promise.all([loadFonts()]);
      setFontsLoaded(true);
    };

    loadAppFonts();
    fetchPassage();
  }, [bookTitle]);

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <ScrollView style={styles.viewItem}>
      <View>
        <Text style={styles.bookTitle}>{bookTitle}</Text>
      </View>
      <View style={styles.verseItem}>
        <Text style={styles.verseText}>{passageText}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Set the background color here
  },
  viewItem: {
      flex: 1,
    backgroundColor: '#FFF'
  },
  verseItem: {
    width: '90%', // Adjust the width as needed
    alignSelf: 'center', // Center the component horizontally
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  verseText: {
    fontSize: 18,
    fontFamily: 'GoudyBookletter1911',
    backgroundColor: '#FFF',
  },
  bookTitle: {
    fontSize: 40,
    backgroundColor: '#fff',
    padding: 80,
    fontFamily: 'GoudyBookletter1911',
    flex: 1,
  },
});

export default BibleScreen;