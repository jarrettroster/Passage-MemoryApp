import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import { Icon } from 'react-native-elements';
import logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import ReservationScreen from './ReservationScreen';
import BibleScreen from './BibleScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: '#010335',
  headerStyle: { backgroundColor: '#B2ECFF' },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => (
            <Icon
              name='home'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='About'
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name='info-circle'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Contact'
        component={ContactScreen}
        options={({ navigation }) => ({
          title: 'Contact Us',
          headerLeft: () => (
            <Icon
              name='address-card'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Reservation'
        component={ReservationScreen}
        options={({ navigation }) => ({
          title: 'Reservation Search',
          headerLeft: () => (
            <Icon
              name='tree'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const BibleNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='BibleScreen'
        component={BibleScreen}
        options={({ route, navigation }) => ({
          title: route.params.bookTitle || 'Bible',
          headerLeft: () => (
            <Icon
              name='book'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: '#B2ECFF' }} // Set the background color of the drawer content
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={logo} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 3 }}>
          <Image source={require('../assets/Passage.png')}
          style={{ width: 175, height: 60 }}
           />
        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
  );


const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampsites());
    dispatch(fetchPromotions());
    dispatch(fetchPartners());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        backgroundColor: '#B2ECFF', // Set the background color of the main container
      }}
    >
      <Drawer.Navigator
        initialRouteName='Home'
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: '#B2ECFF' }} // Set the background color of the drawer
      >
        <Drawer.Screen
          name='Home'
          component={HomeNavigator}
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Bookmarked Verses'
          component={ReservationNavigator}
          options={{
            title: 'Bookmarked Verses',
            drawerIcon: ({ color }) => (
              <Icon
                name='bookmark'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Bible'
          component={BibleNavigator}
          options={{
            title: 'Bible',
            drawerIcon: ({ color }) => (
              <Icon
                name='book'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='About'
          component={AboutNavigator}
          options={{
            title: 'About',
            drawerIcon: ({ color }) => (
              <Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Contact'
          component={ContactNavigator}
          options={{
            title: 'Contact Us',
            drawerIcon: ({ color }) => (
              <Icon
                name='address-card'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B2ECFF', // Set the background color here
  },
  drawerHeader: {
    backgroundColor: '#B2ECFF',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: '#B2ECFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    height: 30,
    width: 20,
  },
  stackIcon: {
    marginLeft: 10,
    color: '#010335',
    fontSize: 24,
  },
});

export default Main;
