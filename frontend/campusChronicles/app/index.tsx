import { Text, View, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

export default function Index() {
    const {top} = useSafeAreaInsets();
    return (
        <View
            style={[styles.container, {paddingTop: top + 30}]}
        >
            <Text>Testing testing 123</Text>
            <Link href="/home">Home</Link>
        </View>

        
    );
}

const styles = StyleSheet.create({  
    container: {    
        flex: 1,    
        backgroundColor: Colors.light.background,    
        alignItems: 'center',    
        justifyContent: 'center',  
    },
    });