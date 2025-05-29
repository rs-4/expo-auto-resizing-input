# AutoResizingInput Component

A React Native component that provides an auto-resizing text input with animated expansion, similar to modern messaging apps like iMessage or WhatsApp.

## Features

- ✅ **Auto-resizing**: Container grows upward as you type multiple lines
- ✅ **Smooth animations**: Built with React Native Reanimated for 60fps performance
- ✅ **Send button**: Adaptive button that changes color based on input state
- ✅ **Action icons**: Four customizable action buttons (attach, rocket, magic, science)
- ✅ **Mobile optimized**: Works with keyboard handling on iOS and Android
- ✅ **TypeScript**: Fully typed with TypeScript support

## Preview

The component automatically expands from a compact single-line input to a multi-line textarea while maintaining smooth animations and keeping the bottom position fixed.

## Installation

Make sure you have the required dependencies:

```bash
npm install react-native-reanimated @expo/vector-icons
```

## Usage

```tsx
import AutoResizingInput from './components/AutoResizingInput';

export default function App() {
  const handleSend = (text: string) => {
    console.log('Message sent:', text);
    // Handle your message sending logic here
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <AutoResizingInput
        onSend={handleSend}
        placeholder="Type your message..."
      />
    </View>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSend` | `(text: string) => void` | `undefined` | Callback function called when send button is pressed |
| `placeholder` | `string` | `"Type your message..."` | Placeholder text for the input field |

## How it works

### Auto-resizing Logic
- Calculates height based on number of lines (`\n` characters)
- Each line = 20px height
- Container height = input height + 80px (for padding and action bar)
- Uses `justify-end` to ensure expansion goes upward

### Animation System
- Built with React Native Reanimated's `useSharedValue` and `useAnimatedStyle`
- Send button has a subtle scale animation when pressed
- Container height changes are smooth and native

### Mobile Keyboard Handling
Recommended setup in your main App component:

```tsx
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <AutoResizingInput onSend={handleSend} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
```

## Styling

The component uses Tailwind CSS classes for styling. Key classes used:
- `bg-zinc-900`: Dark background
- `border-zinc-700`: Subtle border
- `rounded-2xl`: Rounded corners
- `text-white`: White text
- `bg-white` / `bg-zinc-700`: Send button states

## Web Limitations ⚠️

**This component is NOT optimized for web browsers** for the following reasons:

### 1. **React Native Reanimated Web Support**
- Reanimated's web support is limited and can be buggy
- Some animations may not work smoothly or at all
- Performance on web is significantly worse than native

### 2. **Mobile-specific UX Patterns**
- Designed for touch interactions, not mouse/keyboard
- Keyboard handling is mobile-specific (`KeyboardAvoidingView`)
- Visual design optimized for mobile screens

### 3. **Missing Web Features**
- No proper focus management for web accessibility
- No keyboard shortcuts (Enter to send, etc.)
- No desktop-specific UI patterns

### 4. **TextInput Behavior**
- `textAlignVertical="top"` doesn't work consistently on web
- Multiline behavior differs between platforms
- Auto-resize calculations may be inaccurate

### 5. **Performance Issues**
- Reanimated worklets don't optimize well for web
- Frequent re-renders can cause lag in browsers
- Animation smoothness is not guaranteed

## Web Alternative

For web applications, consider using:
- Regular HTML `<textarea>` with CSS `resize: none`
- CSS `field-sizing: content` (modern browsers)
- Web-specific libraries like `react-textarea-autosize`
- Custom CSS animations instead of Reanimated

Example web-friendly alternative:
```css
textarea {
  field-sizing: content;
  min-height: 20px;
  max-height: 120px;
  resize: none;
}
```

## Development

The component was built with:
- React Native 0.79+
- React Native Reanimated 3.17+
- Expo Vector Icons
- TypeScript
- Tailwind CSS (NativeWind)

## Contributing

When contributing:
1. Test on both iOS and Android devices
2. Ensure animations are smooth (60fps)
3. Follow the existing TypeScript patterns
4. Update this README if adding new features

## License

MIT License - feel free to use in your projects! 