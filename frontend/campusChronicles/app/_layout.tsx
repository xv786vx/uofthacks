import { Stack } from "expo-router"
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';


const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: true}}/>
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ActionSheetProvider>
      <>
        <StatusBar style="light" />
        <GestureHandlerRootView style={{ flex: 1}}>
        <InitialLayout />
        </GestureHandlerRootView>
      </>
    </ActionSheetProvider>
  );
};

export default RootLayoutNav;