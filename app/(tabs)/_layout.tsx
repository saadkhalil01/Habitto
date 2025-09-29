import { Tabs } from 'expo-router';
import React from 'react';

import { TabBar } from '@/components/tabbar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#1C1C1E' : '#E5E5E5',
        },
        tabBarLabelStyle: {
          fontFamily: Fonts?.medium || 'System',
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarButton: TabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="sun.max.fill"
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="checkmark.circle.fill"
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="chart.line.uptrend.xyaxis"
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="person.circle.fill"
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
