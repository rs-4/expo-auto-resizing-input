import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface AutoResizingInputProps {
  onSend?: (text: string) => void;
  placeholder?: string;
}

const AutoResizingInput: React.FC<AutoResizingInputProps> = ({
  onSend,
  placeholder = "Type your message...",
}) => {
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(20);
  const inputRef = useRef<TextInput>(null);
  
  // Animation for send button press
  const animationProgress = useSharedValue(0);
  
  const handleSend = () => {
    if (text.trim()) {
      onSend?.(text.trim());
      setText('');
      setInputHeight(20);
      
      // Quick animation
      animationProgress.value = withSpring(1, { damping: 15 });
      setTimeout(() => {
        animationProgress.value = withSpring(0, { damping: 15 });
      }, 100);
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    
    // Calculate height based on lines
    const lines = newText.split('\n');
    const lineCount = Math.max(1, lines.length);
    const newInputHeight = lineCount * 20;
    setInputHeight(newInputHeight);
  };

  // Handle key press for web (Enter to send)
  const handleKeyPress = (e: any) => {
    if (Platform.OS === 'web' && e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle input container press to focus input (especially for web)
  const handleInputContainerPress = () => {
    inputRef.current?.focus();
  };

  // Container height = input height + padding for icons/buttons
  const containerHeight = inputHeight + 80;

  // Simple animated styles
  const animatedContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationProgress.value, [0, 1], [1, 0.95]);
    return {
      transform: [{ scale }],
      height: containerHeight,
    };
  });

  return (
    <View className="px-4 pb-6 pt-1 justify-end">
      <Animated.View
        style={[animatedContainerStyle]}
        className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden"
      >
        {/* Input area */}
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={handleInputContainerPress}
          className="flex-1 px-6 pt-2 mt-1"
        >
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={handleTextChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            multiline
            className="text-white text-base"
            textAlignVertical="top"
            style={{ 
              fontSize: 16, 
              lineHeight: 20,
              height: inputHeight + 15,
              // Remove focus outline/border
              ...(Platform.OS === 'web' && {
                outline: 'none',
                border: 'none',
              }),
            }}
          />
        </TouchableOpacity>

        {/* Bottom section */}
        <View className="flex-row items-center justify-between px-4 pb-4 pt-2">
          {/* Icons */}
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-4 p-1">
              <MaterialIcons name="attach-file" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="mr-4 p-1">
              <Ionicons name="rocket" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="mr-4 p-1">
              <MaterialIcons name="auto-awesome" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="p-1">
              <MaterialIcons name="science" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Send button */}
          <TouchableOpacity
            onPress={handleSend}
            disabled={!text.trim()}
            className={`px-4 py-2 rounded-full ${
              text.trim() ? 'bg-white ' : 'bg-zinc-700'
            }`}
          >
            <Text 
              className={`font-medium ${
                text.trim() ? 'text-black' : 'text-gray-400'
              }`}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default AutoResizingInput;
