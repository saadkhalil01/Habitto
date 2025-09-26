import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for demonstration
const mockHabits = [
    {
        id: '1',
        name: 'Drink Water',
        icon: 'drop.fill',
        color: '#4A90E2',
        category: 'Health',
        frequency: 'daily',
        targetCount: 8,
        currentStreak: 12,
        bestStreak: 25,
        isPositive: true,
    },
    {
        id: '2',
        name: 'Exercise',
        icon: 'figure.run',
        color: '#7ED321',
        category: 'Health',
        frequency: 'daily',
        targetCount: 1,
        currentStreak: 5,
        bestStreak: 15,
        isPositive: true,
    },
    {
        id: '3',
        name: 'No Soda',
        icon: 'cup.and.straw',
        color: '#F5A623',
        category: 'Health',
        frequency: 'daily',
        targetCount: 1,
        currentStreak: 8,
        bestStreak: 12,
        isPositive: false,
    },
    {
        id: '4',
        name: 'Read Books',
        icon: 'book.fill',
        color: '#9013FE',
        category: 'Learning',
        frequency: 'daily',
        targetCount: 1,
        currentStreak: 3,
        bestStreak: 7,
        isPositive: true,
    },
];

const categories = ['All', 'Health', 'Learning', 'Productivity', 'Personal Growth'];

export default function HabitsScreen() {
    const colorScheme = useColorScheme();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [habits, setHabits] = useState(mockHabits);

    const filteredHabits = selectedCategory === 'All'
        ? habits
        : habits.filter(habit => habit.category === selectedCategory);

    const handleAddHabit = () => {
        router.push('/modal');
    };

    const handleEditHabit = (habit) => {
        Alert.alert('Edit Habit', `Edit ${habit.name}`);
    };

    const handleDeleteHabit = (habitId) => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setHabits(habits.filter(h => h.id !== habitId));
                    },
                },
            ]
        );
    };

    const renderHabitItem = ({ item }) => (
        <ThemedView style={styles.habitCard}>
            <View style={styles.habitHeader}>
                <View style={styles.habitInfo}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                        <IconSymbol name={item.icon} size={24} color="white" />
                    </View>
                    <View style={styles.habitDetails}>
                        <ThemedText style={styles.habitName}>{item.name}</ThemedText>
                        <ThemedText style={styles.habitCategory}>{item.category}</ThemedText>
                        <View style={styles.streakInfo}>
                            <ThemedText style={styles.streakText}>
                                🔥 {item.currentStreak} day streak
                            </ThemedText>
                            <ThemedText style={styles.bestStreakText}>
                                Best: {item.bestStreak} days
                            </ThemedText>
                        </View>
                    </View>
                </View>
                <View style={styles.habitActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEditHabit(item)}
                    >
                        <IconSymbol name="pencil" size={20} color={Colors[colorScheme ?? 'light'].text} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDeleteHabit(item.id)}
                    >
                        <IconSymbol name="trash" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedView>
    );

    const renderCategoryFilter = () => (
        <View style={styles.categoryContainer}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === item && styles.selectedCategoryButton,
                        ]}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <ThemedText
                            style={[
                                styles.categoryText,
                                selectedCategory === item && styles.selectedCategoryText,
                            ]}
                        >
                            {item}
                        </ThemedText>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top', 'left', 'right']}>
            <ThemedView style={[styles.header, { backgroundColor: colorScheme === 'dark' ? '#000' : 'white' }]}>
                <ThemedText style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>My Habits</ThemedText>
                <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
                    <IconSymbol name="plus" size={24} color="white" />
                </TouchableOpacity>
            </ThemedView>

            {renderCategoryFilter()}

            <FlatList
                data={filteredHabits}
                keyExtractor={(item) => item.id}
                renderItem={renderHabitItem}
                contentContainerStyle={styles.habitsList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        height: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    addButton: {
        backgroundColor: '#007AFF',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryContainer: {
        paddingVertical: 16,
        paddingLeft: 20,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        borderRadius: 20,
        backgroundColor: '#E5E5E5',
    },
    selectedCategoryButton: {
        backgroundColor: '#007AFF',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    selectedCategoryText: {
        color: 'white',
    },
    habitsList: {
        padding: 20,
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
    habitCategory: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    streakInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FF6B35',
        marginRight: 12,
    },
    bestStreakText: {
        fontSize: 12,
        color: '#999',
    },
    habitActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 8,
        marginLeft: 8,
    },
});
