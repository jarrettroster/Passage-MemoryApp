import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getEsvText } from '../utils/api';


const BibleScreen = () => {
  const [passageText, setPassageText] = useState('');

  useEffect(() => {
    const fetchPassage = async () => {
      const passage = 'John 3:16'; // Replace with your desired passage
      const text = await getEsvText(passage);
      setPassageText(text);
    };

    fetchPassage();
  }, []);

  return (
    <View>
      <Text>{passageText}</Text>
    </View>
  );
};

export default BibleScreen;