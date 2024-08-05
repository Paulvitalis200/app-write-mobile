import { Link } from 'expo-router';
import { View, Text } from 'react-native';


export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white font-pblack">
      <Text className="text-3xl">Finesse</Text>
      <Link href="/home" style={{ color: 'blue'}}>Go to Home</Link>
    </View>
  );
}
