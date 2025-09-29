import AppHeader from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for progress tracking
const mockProgressData = {
    currentWeek: [
        { date: '2024-01-15', completed: 3, total: 4 },
        { date: '2024-01-16', completed: 4, total: 4 },
        { date: '2024-01-17', completed: 2, total: 4 },
        { date: '2024-01-18', completed: 4, total: 4 },
        { date: '2024-01-19', completed: 3, total: 4 },
        { date: '2024-01-20', completed: 1, total: 4 },
        { date: '2024-01-21', completed: 4, total: 4 },
    ],
    habits: [
        {
            id: '1',
            name: 'Drink Water',
            color: '#4A90E2',
            weeklyData: [1, 1, 0, 1, 1, 0, 1],
            streak: 12,
            bestStreak: 25,
            completionRate: 85,
        },
        {
            id: '2',
            name: 'Exercise',
            color: '#7ED321',
            weeklyData: [1, 1, 1, 1, 0, 0, 1],
            streak: 5,
            bestStreak: 15,
            completionRate: 71,
        },
        {
            id: '3',
            name: 'No Soda',
            color: '#F5A623',
            weeklyData: [1, 1, 0, 1, 1, 1, 1],
            streak: 8,
            bestStreak: 12,
            completionRate: 86,
        },
        {
            id: '4',
            name: 'Read Books',
            color: '#9013FE',
            weeklyData: [0, 1, 1, 1, 1, 0, 1],
            streak: 3,
            bestStreak: 7,
            completionRate: 71,
        },
    ],
    milestones: [
        { id: '1', title: '7-day streak', habitName: 'No Soda', date: '2024-01-20', achieved: true },
        { id: '2', title: '30-day streak', habitName: 'Drink Water', date: '2024-01-25', achieved: false },
        { id: '3', title: '100 completions', habitName: 'Exercise', date: '2024-02-15', achieved: false },
    ],
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ProgressScreen() {
    const colorScheme = useColorScheme();
    const [selectedView, setSelectedView] = useState('overview');

    const renderOverviewStats = () => (
        <ThemedView style={styles.statsContainer}>
            <ThemedText style={styles.sectionTitle}>This Week</ThemedText>

            <View style={styles.weeklyOverview}>
                {mockProgressData.currentWeek.map((day, index) => {
                    const percentage = (day.completed / day.total) * 100;
                    const dayName = weekDays[index];

                    return (
                        <View key={day.date} style={styles.dayColumn}>
                            <ThemedText style={styles.dayLabel}>{dayName}</ThemedText>
                            <View style={styles.dayProgress}>
                                <View style={styles.progressBarBackground}>
                                    <View
                                        style={[
                                            styles.progressBarFill,
                                            {
                                                height: `${percentage}%`,
                                                backgroundColor: percentage === 100 ? '#34C759' : '#007AFF',
                                            }
                                        ]}
                                    />
                                </View>
                            </View>
                            <ThemedText style={styles.dayText}>
                                {day.completed}/{day.total}
                            </ThemedText>
                        </View>
                    );
                })}
            </View>
        </ThemedView>
    );

    const renderHabitDetails = () => (
        <ThemedView style={styles.statsContainer}>
            <ThemedText style={styles.sectionTitle}>Habit Details</ThemedText>

            {mockProgressData.habits.map((habit) => (
                <View key={habit.id} style={styles.habitDetailCard}>
                    <View style={styles.habitDetailHeader}>
                        <View style={styles.habitDetailInfo}>
                            <View style={[styles.colorDot, { backgroundColor: habit.color }]} />
                            <ThemedText style={styles.habitDetailName}>{habit.name}</ThemedText>
                        </View>
                        <ThemedText style={styles.completionRate}>
                            {habit.completionRate}%
                        </ThemedText>
                    </View>

                    <View style={styles.streakInfo}>
                        <View style={styles.streakItem}>
                            <ThemedText style={styles.streakNumber}>{habit.streak}</ThemedText>
                            <ThemedText style={styles.streakLabel}>Current Streak</ThemedText>
                        </View>
                        <View style={styles.streakItem}>
                            <ThemedText style={styles.streakNumber}>{habit.bestStreak}</ThemedText>
                            <ThemedText style={styles.streakLabel}>Best Streak</ThemedText>
                        </View>
                    </View>

                    <View style={styles.weeklyChart}>
                        <ThemedText style={styles.chartTitle}>Last 7 Days</ThemedText>
                        <View style={styles.chartDots}>
                            {habit.weeklyData.map((completed, index) => (
                                <View key={index} style={styles.chartDay}>
                                    <View
                                        style={[
                                            styles.chartDot,
                                            {
                                                backgroundColor: completed ? habit.color : '#E5E5E5',
                                            }
                                        ]}
                                    />
                                    <ThemedText style={styles.chartDayLabel}>
                                        {weekDays[index]}
                                    </ThemedText>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            ))}
        </ThemedView>
    );

    const renderMilestones = () => (
        <ThemedView style={styles.statsContainer}>
            <ThemedText style={styles.sectionTitle}>Milestones</ThemedText>

            {mockProgressData.milestones.map((milestone) => (
                <View key={milestone.id} style={styles.milestoneCard}>
                    <View style={styles.milestoneIcon}>
                        <IconSymbol
                            name={milestone.achieved ? 'star.fill' : 'star'}
                            size={24}
                            color={milestone.achieved ? '#FFD700' : Colors[colorScheme ?? 'light'].icon}
                        />
                    </View>
                    <View style={styles.milestoneInfo}>
                        <ThemedText style={styles.milestoneTitle}>
                            {milestone.title}
                        </ThemedText>
                        <ThemedText style={styles.milestoneSubtitle}>
                            {milestone.habitName}
                        </ThemedText>
                        <ThemedText style={styles.milestoneDate}>
                            {milestone.achieved ? 'Achieved' : 'Target'}: {milestone.date}
                        </ThemedText>
                    </View>
                    {milestone.achieved && (
                        <View style={styles.achievedBadge}>
                            <ThemedText style={styles.achievedText}>✓</ThemedText>
                        </View>
                    )}
                </View>
            ))}
        </ThemedView>
    );

    const renderViewSelector = () => (
        <View style={[styles.viewSelector, { backgroundColor: colorScheme === 'dark' ? '#000' : 'white' }]}>
            <TouchableOpacity
                style={[
                    styles.viewButton,
                    selectedView === 'overview' && styles.selectedViewButton,
                ]}
                onPress={() => setSelectedView('overview')}
            >
                <ThemedText
                    style={[
                        styles.viewButtonText,
                        selectedView === 'overview' && styles.selectedViewButtonText,
                    ]}
                >
                    Overview
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.viewButton,
                    selectedView === 'habits' && styles.selectedViewButton,
                ]}
                onPress={() => setSelectedView('habits')}
            >
                <ThemedText
                    style={[
                        styles.viewButtonText,
                        selectedView === 'habits' && styles.selectedViewButtonText,
                    ]}
                >
                    Habits
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.viewButton,
                    selectedView === 'milestones' && styles.selectedViewButton,
                ]}
                onPress={() => setSelectedView('milestones')}
            >
                <ThemedText
                    style={[
                        styles.viewButtonText,
                        selectedView === 'milestones' && styles.selectedViewButtonText,
                    ]}
                >
                    Milestones
                </ThemedText>
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => {
        switch (selectedView) {
            case 'overview':
                return renderOverviewStats();
            case 'habits':
                return renderHabitDetails();
            case 'milestones':
                return renderMilestones();
            default:
                return renderOverviewStats();
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top', 'left', 'right']}>
            <AppHeader title="Progress" leftIcon={undefined} rightIcon={undefined} onLeftPress={undefined} onRightPress={undefined} rightText={undefined} leftIconColor={undefined} rightIconColor={undefined} />

            {renderViewSelector()}

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {renderContent()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewSelector: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    viewButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
    },
    selectedViewButton: {
        backgroundColor: '#007AFF',
    },
    viewButtonText: {
        fontSize: 14,
        fontFamily: Fonts?.medium || 'System',
        fontWeight: '500',
        color: '#666',
    },
    selectedViewButtonText: {
        color: 'white',
    },
    content: {
        flex: 1,
    },
    statsContainer: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: Fonts?.semiBold || 'System',
        fontWeight: '600',
        marginBottom: 20,
        color: '#000',
    },
    weeklyOverview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayColumn: {
        alignItems: 'center',
        flex: 1,
    },
    dayLabel: {
        fontSize: 12,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
        marginBottom: 8,
    },
    dayProgress: {
        height: 80,
        width: 20,
        marginBottom: 8,
    },
    progressBarBackground: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    progressBarFill: {
        borderRadius: 10,
        minHeight: 4,
    },
    dayText: {
        fontSize: 10,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
    },
    habitDetailCard: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    habitDetailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    habitDetailInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    habitDetailName: {
        fontSize: 16,
        fontFamily: Fonts?.semiBold || 'System',
        fontWeight: '600',
        color: '#000',
    },
    completionRate: {
        fontSize: 18,
        fontFamily: Fonts?.bold || 'System',
        fontWeight: 'bold',
        color: '#007AFF',
    },
    streakInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    streakItem: {
        alignItems: 'center',
    },
    streakNumber: {
        fontSize: 24,
        fontFamily: Fonts?.bold || 'System',
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    streakLabel: {
        fontSize: 12,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
        marginTop: 4,
    },
    weeklyChart: {
        marginTop: 16,
    },
    chartTitle: {
        fontSize: 14,
        fontFamily: Fonts?.medium || 'System',
        fontWeight: '500',
        marginBottom: 12,
        color: '#666',
    },
    chartDots: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chartDay: {
        alignItems: 'center',
    },
    chartDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginBottom: 4,
    },
    chartDayLabel: {
        fontSize: 10,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
    },
    milestoneCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        marginBottom: 12,
    },
    milestoneIcon: {
        marginRight: 12,
    },
    milestoneInfo: {
        flex: 1,
    },
    milestoneTitle: {
        fontSize: 16,
        fontFamily: Fonts?.semiBold || 'System',
        fontWeight: '600',
        marginBottom: 4,
        color: '#000',
    },
    milestoneSubtitle: {
        fontSize: 14,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
        marginBottom: 2,
    },
    milestoneDate: {
        fontSize: 12,
        fontFamily: Fonts?.regular || 'System',
        color: '#999',
    },
    achievedBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#34C759',
        justifyContent: 'center',
        alignItems: 'center',
    },
    achievedText: {
        color: 'white',
        fontSize: 14,
        fontFamily: Fonts?.bold || 'System',
        fontWeight: 'bold',
    },
});
