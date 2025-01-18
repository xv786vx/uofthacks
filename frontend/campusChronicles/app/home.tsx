import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { Link } from 'expo-router'

const Home = () => {
  useEffect(() => {
    // Configure the native navigation bar
    NavigationBar.setBackgroundColorAsync('#ffffff'); // White background
    NavigationBar.setButtonStyleAsync('dark'); // Dark button style for light background
    NavigationBar.setPositionAsync('absolute'); // Float above content
  }, []);

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen Content</Text>
        <Link href="/memory">Memory</Link>
      </View>

      {/* Profile Picture Icon in Bottom Left */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.profileIcon}>
          {/* Replace this Text with an Image for a real profile picture */}
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Plus Button in Top Right */}
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
    bottom: 20, // Adjust to move closer/farther from the bottom
    left: 20, // Adjust to move closer/farther from the left edge
  },
  profileIcon: {
    width: 55,
    height: 55,
    borderRadius: 27.5, // Circle shape
    backgroundColor: '#ffffff', // Pure white button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Shadow for Android
    borderWidth: 1, // Subtle black outline
    borderColor: '#e0e0e0', // Light gray outline color
  },
  iconText: {
    fontSize: 24,
    color: '#333', // Darker icon color for contrast
  },
  topContainer: {
    position: 'absolute',
    top: 20, // Adjust to move closer/farther from the top
    right: 20, // Adjust to move closer/farther from the right edge
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 15, // Rounded square shape
    backgroundColor: '#ffffff', // Pure white button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Shadow for Android
    borderWidth: 1, // Subtle black outline
    borderColor: '#e0e0e0', // Light gray outline color
  },
  plusIcon: {
    fontSize: 30, // Larger plus icon
    color: '#333', // Darker text for contrast
    fontWeight: 'bold',
  },
});

export default Home;
