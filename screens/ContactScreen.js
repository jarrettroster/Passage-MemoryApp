import React from 'react';
import { ScrollView} from 'react-native';
import { Card, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


const ContactScreen = () => {
    return (
            <ScrollView>
                <Animatable.View
                        animation='fadeInDown'
                        duration={2000}
                        delay={1000}
                > 
                    <Card wrapperStyle={{margin: 20}}>
                        <Card.Title>Contact Information</Card.Title>
                        <Card.Divider />
                        <Text>1 Nucamp Way{'\n'}Seattle, WA 98001{'\n'}U.S.A.</Text>
                        <Text style={{marginTop: 10}}>Phone: 1-206-555-1234</Text>
                        <Text>Email: campsites@nucamp.co</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
    );
};

export default ContactScreen;