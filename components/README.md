# AutoResizingInput Component

A React Native component that provides an auto-resizing text input with animated expansion, similar to modern messaging apps like iMessage or WhatsApp.

## ✨ Features

- 🚀 **Auto-resizing**: Container grows upward as you type multiple lines
- 🎬 **Smooth animations**: Built with React Native Reanimated for 60fps performance
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 🎯 **Send button**: Adaptive button that changes color based on input state
- 🔧 **Action icons**: Four customizable action buttons (attach, rocket, magic, science)
- ⌨️ **Keyboard shortcuts**: Enter to send, Shift+Enter for new line (Web)
- 🎨 **Modern UI**: Dark theme with Tailwind CSS styling
- 📝 **TypeScript**: Fully typed with TypeScript support

## 🛠️ Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| **iOS** | ✅ Full Support | Native animations, keyboard handling |
| **Android** | ✅ Full Support | Native animations, keyboard handling |
| **Web** | ✅ Full Support | Keyboard shortcuts, focus management |

## 📋 Requirements

| Dependency | Version | Required |
|------------|---------|----------|
| **Expo SDK** | 53.0.0+ | ✅ |
| **React Native** | 0.79+ | ✅ |
| **React Native Reanimated** | 3.17+ | ✅ |
| **Expo Vector Icons** | 14.0+ | ✅ |
| **Tailwind CSS (NativeWind)** | Latest | ✅ |
| **TypeScript** | 5.8+ | ✅ |
| **React DOM** | 19.0.0 | ✅ (Web only) |
| **React Native Web** | 0.20+ | ✅ (Web only) |

## 🚀 Installation

```bash
# Install core dependencies
npm install react-native-reanimated @expo/vector-icons

# For web support (optional)
npm install react-native-web react-dom@19.0.0 --legacy-peer-deps
```

## 📖 Usage

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

## 🎛️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSend` | `(text: string) => void` | `undefined` | Callback function called when send button is pressed |
| `placeholder` | `string` | `"Type your message..."` | Placeholder text for the input field |

## ⚙️ How it works

### Auto-resizing Logic
- Calculates height based on number of lines (`\n` characters)
- Each line = 20px height
- Container height = input height + 80px (for padding and action bar)
- Uses `justify-end` to ensure expansion goes upward

### Animation System
- Built with React Native Reanimated's `useSharedValue` and `useAnimatedStyle`
- Send button has a subtle scale animation when pressed
- Container height changes are smooth and native

### Platform-specific Features

#### Mobile (iOS/Android)
- Touch-optimized interactions
- Native keyboard handling
- Smooth 60fps animations

#### Web
- **Enter** to send message
- **Shift+Enter** for new line
- Click anywhere in input area to focus
- No focus outline for clean design

## 🎨 Styling

The component uses Tailwind CSS (NativeWind) classes:

| Element | Classes | Description |
|---------|---------|-------------|
| Container | `bg-zinc-900 border-zinc-700 rounded-2xl` | Dark theme with rounded corners |
| Input | `text-white text-base` | White text, standard size |
| Send Button | `bg-white` / `bg-zinc-700` | White when active, gray when disabled |
| Icons | `text-gray-400` | Subtle gray icons |

## 📱 Mobile Setup

Recommended setup in your main App component:

```tsx
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Platform 
} from 'react-native';

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

## 🌐 Web Deployment

For web deployment, ensure you have:

```bash
# Install web dependencies
npm install react-native-web react-dom@19.0.0 @expo/metro-runtime --legacy-peer-deps

# Start web development server
npx expo start --web
```

## 🔧 Customization

### Changing Colors
Modify the Tailwind classes in the component:
```tsx
// Container background
className="bg-zinc-900" // Change to your preferred color

// Send button active state  
className="bg-white" // Change to your brand color
```

### Adjusting Height Calculation
Modify the line height calculation:
```tsx
const newInputHeight = lineCount * 25; // Change from 20 to 25 for taller lines
```

## 🐛 Troubleshooting

### Web Issues
- **Page won't load**: Check react-dom version is exactly 19.0.0
- **Focus issues**: Ensure you're clicking in the input area
- **Animations laggy**: This is expected, web performance is lower than native

### Mobile Issues
- **Keyboard covers input**: Use KeyboardAvoidingView wrapper
- **Animations choppy**: Ensure Reanimated is properly installed
- **Height not updating**: Check if onContentSizeChange is firing

## 🤝 Contributing

When contributing:
1. Test on iOS, Android, and Web
2. Ensure animations are smooth (60fps on mobile)
3. Follow TypeScript patterns
4. Update this README if adding features

## 📄 License

MIT License - feel free to use in your projects!

---

Built with ❤️ using React Native, Reanimated, and Tailwind CSS 