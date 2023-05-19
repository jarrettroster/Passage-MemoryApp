import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getEsvText } from '../utils/api';
import { ScrollView } from 'react-native-gesture-handler';


const BibleScreen = () => {
  const [passageText, setPassageText] = useState('');

  useEffect(() => {
    const fetchPassage = async () => {
      const passage = 'Ephesians 1'; // Replace with your desired passage
      const text = await getEsvText(passage);
      setPassageText(text);
    };

    fetchPassage();
  }, []);

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
        backgroundColor: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingLeft: 35,
        paddingRight: 35
    },
    verseText: {
        fontSize: 18,
        fontFamily: 'Roboto'
    },
    bookTitle: {
        fontSize: 50,
        backgroundColor: "#fff",
        padding: 80,
        flex: 1
    }
})

export default BibleScreen;