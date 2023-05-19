import { Animated, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }


    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{ uri: baseUrl }}>
                    <View style={{ justifyContent: 'center', flex: 2 }}>
                        <Text
                            style={{
                                color: 'black',
                                textAlign: 'center',
                                fontSize: 26,
                            }}
                            >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text 
                    style={{ 
                        margin: 20,
                        paddingTop: 60
                     }}
                    >{item.description}</Text>
            </Card>
        );
    }
    return <View />;
};

const HomeScreen = () => {
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true  
    });

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find(
        (item) => item.featured
    );
    const featPartner = partners.partnersArray.find((item) => item.featured);
    // const featEphesians = partners.partnersArray.find((item) => item.featured);

    useEffect(() => {
        scaleAnimation.start(); 
    }, []);

    return (
        <Animated.ScrollView style ={{ transform: [{ scale: scaleValue }] }}>
            <FeaturedItem 
                item={featCampsite}
                isLoading={campsites.isLoading}
                errMess={campsites.errMess}
            />
        </Animated.ScrollView>
    );
};


export default HomeScreen;