import './global.css';

import { StatusBar } from 'expo-status-bar';
import {
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AutoResizingInput from './components/AutoResizingInput';

export default function App() {
  const handleSend = (text: string) => {
    Alert.alert('Message sent', text);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView className="flex-1 bg-black" behavior={'padding'} enabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-end bg-black">
            <AutoResizingInput onSend={handleSend} placeholder="Type your message..." />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
