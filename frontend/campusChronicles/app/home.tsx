import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { Link } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Home = () => {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#ffffff'); 
    NavigationBar.setButtonStyleAsync('dark'); 
    NavigationBar.setPositionAsync('absolute'); 
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen Content</Text>
        <Link href="/memory">Memory</Link>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.plusButton}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20, 
    left: 20, 
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 27.5, 
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 5, 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
  },
  iconText: {
    fontSize: 24,
    color: '#333', 
  },
  topContainer: {
    position: 'absolute',
    top: 20, 
    right: 20, 
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 5, 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
  },
  plusIcon: {
    fontSize: 30, 
    color: '#333', 
    fontWeight: 'bold',
  },
});

export default Home;
