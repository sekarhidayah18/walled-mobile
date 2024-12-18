import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#19918F' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="topup"
        options={{
          title: 'Top Up',
          tabBarIcon: ({ color }) => <FontAwesome5 name="plus-square" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bank-transfer" size={33} color={color} />,
        }}
      />

    </Tabs>
  );
}