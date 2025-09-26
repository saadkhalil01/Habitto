import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for today's habits
const mockTodayHabits = [
  {
    id: '1',
    name: 'Drink Water',
    icon: 'drop.fill',
    color: '#4A90E2',
    targetCount: 8,
    completedCount: 5,
    isCompleted: false,
    isPositive: true,
    timeOfDay: 'morning',
  },
  {
    id: '2',
    name: 'Exercise',
    icon: 'figure.run',
    color: '#7ED321',
    targetCount: 1,
    completedCount: 0,
    isCompleted: false,
    isPositive: true,
    timeOfDay: 'morning',
  },
  {
    id: '3',
    name: 'No Soda',
    icon: 'cup.and.straw',
    color: '#F5A623',
    targetCount: 1,
    completedCount: 1,
    isCompleted: true,
    isPositive: false,
    timeOfDay: 'all-day',
  },
  {
    id: '4',
    name: 'Read Books',
    icon: 'book.fill',
    color: '#9013FE',
    targetCount: 1,
    completedCount: 0,
    isCompleted: false,
    isPositive: true,
    timeOfDay: 'evening',
  },
];

export default function TodayScreen() {
  const colorScheme = useColorScheme();
  const [habits, setHabits] = useState(mockTodayHabits);
  const [currentDate] = useState(new Date());

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleHabitComplete = (habitId) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          if (habit.isPositive) {
            // For positive habits, increment count
            const newCount = Math.min(habit.completedCount + 1, habit.targetCount);
            return {
              ...habit,
              completedCount: newCount,
              isCompleted: newCount >= habit.targetCount,
            };
          } else {
            // For negative habits, toggle completion
            return {
              ...habit,
              completedCount: habit.isCompleted ? 0 : 1,
              isCompleted: !habit.isCompleted,
            };
          }
        }
        return habit;
      })
    );
  };

  const handleHabitSkip = (habitId) => {
    Alert.alert(
      'Skip Habit',
      'Add a note about why you&apos;re skipping this habit?',
      [
        { text: 'Just Skip', onPress: () => console.log('Skipped without note') },
        { text: 'Add Note', onPress: () => console.log('Open note modal') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getCompletionPercentage = () => {
    const completed = habits.filter(h => h.isCompleted).length;
    return habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;
  };

  const renderProgressRing = () => {
    const percentage = getCompletionPercentage();
    return (
      <ThemedView style={[styles.progressContainer, { backgroundColor: colorScheme === 'dark' ? '#000' : 'white' }]}>
        <View style={styles.progressRing}>
          <ThemedText style={styles.progressText}>{percentage}%</ThemedText>
        </View>
        <ThemedText style={[styles.progressLabel, { color: colorScheme === 'dark' ? '#ccc' : '#666' }]}>Today's Progress</ThemedText>
      </ThemedView>
    );
  };

  const renderHabitItem = ({ item }) => {
    const progress = item.isPositive
      ? item.completedCount / item.targetCount
      : item.isCompleted ? 1 : 0;

    return (
      <ThemedView style={styles.habitCard}>
        <View style={styles.habitHeader}>
          <View style={styles.habitInfo}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <IconSymbol name={item.icon} size={24} color="white" />
            </View>
            <View style={styles.habitDetails}>
              <ThemedText style={styles.habitName}>{item.name}</ThemedText>
              {item.isPositive ? (
                <ThemedText style={styles.habitProgress}>
                  {item.completedCount}/{item.targetCount} completed
                </ThemedText>
              ) : (
                <ThemedText style={styles.habitProgress}>
                  {item.isCompleted ? 'Avoided today' : 'Stay strong!'}
                </ThemedText>
              )}
            </View>
          </View>

          <View style={styles.habitActions}>
            {!item.isCompleted && (
              <>
                <TouchableOpacity
                  style={[styles.actionButton, styles.skipButton]}
                  onPress={() => handleHabitSkip(item.id)}
                >
                  <IconSymbol name="xmark" size={16} color="#FF3B30" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={() => handleHabitComplete(item.id)}
                >
                  <IconSymbol name="checkmark" size={16} color="white" />
                </TouchableOpacity>
              </>
            )}
            {item.isCompleted && (
              <View style={[styles.actionButton, styles.completedButton]}>
                <IconSymbol name="checkmark" size={16} color="white" />
              </View>
            )}
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progress * 100}%`,
                  backgroundColor: item.color,
                }
              ]}
            />
          </View>
        </View>
      </ThemedView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top', 'left', 'right']}>
      <ThemedView style={[styles.header, { backgroundColor: colorScheme === 'dark' ? '#000' : 'white' }]}>
        <View>
          <ThemedText style={[styles.greeting, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Good Morning! 👋</ThemedText>
          <ThemedText style={[styles.date, { color: colorScheme === 'dark' ? '#ccc' : '#666' }]}>{formatDate(currentDate)}</ThemedText>
        </View>
      </ThemedView>

      {renderProgressRing()}

      <View style={styles.content}>
        <ThemedText style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Today&apos;s Habits</ThemedText>

        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={renderHabitItem}
          contentContainerStyle={styles.habitsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: 'white',
    marginTop: 1,
  },
  progressRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 16,
    color: '#000',
  },
  habitsList: {
    paddingHorizontal: 20,
  },
  habitCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  habitDetails: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  habitProgress: {
    fontSize: 14,
    color: '#666',
  },
  habitActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  skipButton: {
    backgroundColor: '#FFE5E5',
  },
  completeButton: {
    backgroundColor: '#34C759',
  },
  completedButton: {
    backgroundColor: '#007AFF',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
