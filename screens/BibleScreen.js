import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getEsvText } from '../utils/api';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'GoudyBookletter1911': require('../screens/assets/fonts/GoudyBookletter1911.ttf'),
  });
};

const BibleScreen = () => {
  const [passageText, setPassageText] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const fetchPassage = async () => {
      const passage = 'Ephesians 1'; // Replace with your desired passage
      const text = await getEsvText(passage);
      setPassageText(text);
    };

    const loadAppFonts = async () => {
      await Promise.all([loadFonts()]);
      setFontsLoaded(true);
    };

    loadAppFonts();
    fetchPassage();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.bookTitle}>Ephesians</Text>
      </View>
      <View style={styles.verseItem}>
        <Text style={styles.verseText}>{passageText}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  verseItem: {
    textAlign: 'center',
    backgroundColor: '#fffff',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#010335',
    padding: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  verseText: {
    fontSize: 18,
    fontFamily: 'GoudyBookletter1911',
  },
  bookTitle: {
    fontSize: 40,
    backgroundColor: '#F0FBFE',
    padding: 80,
    flex: 1,
  },
});

export default BibleScreen;