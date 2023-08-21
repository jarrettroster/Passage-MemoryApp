import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const loadFonts = async () => {
  await Font.loadAsync({
    'GoudyBookletter1911': require('../screens/assets/fonts/GoudyBookletter1911.ttf'),
  });
};

const HomeScreen = () => {
  const [showOldTestamentCard, setShowOldTestamentCard] = useState(false);
  const [showNewTestamentCard, setShowNewTestamentCard] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const navigation = useNavigation();

  const handleBookPress = (book) => {
    navigation.navigate('Bible', { screen: 'BibleScreen', params: { bookTitle: book } });
  };

  useEffect(() => {
    const loadAppFonts = async () => {
      await Promise.all([loadFonts()]);
      setFontsLoaded(true);
    };

    loadAppFonts();
  }, []);


  const toggleOldTestamentCard = () => {
    setShowOldTestamentCard(!showOldTestamentCard);
    setShowNewTestamentCard(false); // Close the other card when opening this one
  };

  const toggleNewTestamentCard = () => {
    setShowNewTestamentCard(!showNewTestamentCard);
    setShowOldTestamentCard(false); // Close the other card when opening this one
  };

  const oldTestamentBooks = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings",
    "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
    "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea",
    "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi"
  ];

  const newTestamentBooks = [
    "Matthew", "Mark", "Luke", "John", "Acts",
    "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
    "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
    "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus",
    "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John", "Jude", "Revelation"
  ];
  
if (!fontsLoaded) {
  return null; // or a loading component
}

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome to the Passage App!</Text>
      <Text style={styles.subheading}>Bible Memorization Made Easy!</Text>

      {/* Card with Form and Buttons */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleOldTestamentCard}
        >
          <Text style={styles.heading}>Old Testament</Text>
        </TouchableOpacity>
        {showOldTestamentCard && (
          <View style={styles.additionalCard}>
            {oldTestamentBooks.map((book, index) => (
              <TouchableOpacity key={index} style={styles.bookButton} onPress={() => handleBookPress(book)}>
                <Text style={styles.textStyle}>{book}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={toggleNewTestamentCard}
        >
          <Text style={styles.heading}>New Testament</Text>
        </TouchableOpacity>
        {showNewTestamentCard && (
          <View style={styles.additionalCard}>
            {newTestamentBooks.map((book, index) => (
              <TouchableOpacity key={index} style={styles.bookButton} onPress={() => handleBookPress(book)}>
                <Text style={styles.textStyle}>{book}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  heading: {
    fontSize: 24,
    alignContent: 'center',
    fontFamily: 'GoudyBookletter1911'
  },
  subheading: {
    fontSize: 14,
    alignContent: 'center',
    fontFamily: 'GoudyBookletter1911'
  },
  card: {
    backgroundColor: '#B2ECFF',
    color: '#010335',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#f0f0f0',
    color: '#010335',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  additionalCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  bookButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'GoudyBookletter1911'
  }
});

export default HomeScreen;