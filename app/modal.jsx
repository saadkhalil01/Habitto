import AppHeader from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const habitIcons = [
    'drop.fill', 'figure.run', 'book.fill', 'cup.and.straw', 'moon.fill',
    'leaf.fill', 'heart.fill', 'brain.head.profile', 'music.note', 'camera.fill',
    'gamecontroller.fill', 'phone.down.fill', 'dollarsign.circle.fill', 'house.fill',
];

const habitColors = [
    '#4A90E2', '#7ED321', '#9013FE', '#F5A623', '#50E3C2',
    '#B8E986', '#FF6B35', '#FF3B30', '#007AFF', '#5856D6',
    '#AF52DE', '#FF2D92', '#FF9500', '#FFCC02',
];

const categories = [
    'Health', 'Learning', 'Productivity', 'Personal Growth', 'Finance',
    'Relationships', 'Fitness', 'Mindfulness', 'Creativity', 'Other'
];

const frequencies = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Specific Days', value: 'specific_days' },
    { label: 'X times per week', value: 'x_per_week' },
    { label: 'X times per month', value: 'x_per_month' },
];

export default function HabitFormModal() {
    const colorScheme = useColorScheme();
    const [habitData, setHabitData] = useState({
        name: '',
        icon: 'drop.fill',
        color: '#4A90E2',
        category: 'Health',
        frequency: 'daily',
        isPositive: true,
        targetCount: 1,
        reminderTimes: [],
        notes: '',
    });

    const handleSave = () => {
        if (!habitData.name.trim()) {
            Alert.alert('Error', 'Please enter a habit name');
            return;
        }

        // Here you would save the habit data
        Alert.alert('Success', 'Habit created successfully!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    const renderIconSelector = () => (
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Icon</ThemedText>
            <View style={styles.iconGrid}>
                {habitIcons.map((icon) => (
                    <TouchableOpacity
                        key={icon}
                        style={[
                            styles.iconButton,
                            habitData.icon === icon && styles.selectedIconButton,
                        ]}
                        onPress={() => setHabitData({ ...habitData, icon })}
                    >
                        <IconSymbol
                            name={icon}
                            size={24}
                            color={habitData.icon === icon ? 'white' : '#666'}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderColorSelector = () => (
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Color</ThemedText>
            <View style={styles.colorGrid}>
                {habitColors.map((color) => (
                    <TouchableOpacity
                        key={color}
                        style={[
                            styles.colorButton,
                            { backgroundColor: color },
                            habitData.color === color && styles.selectedColorButton,
                        ]}
                        onPress={() => setHabitData({ ...habitData, color })}
                    >
                        {habitData.color === color && (
                            <IconSymbol name="checkmark" size={16} color="white" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderHabitType = () => (
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Habit Type</ThemedText>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        habitData.isPositive && styles.selectedToggleButton,
                    ]}
                    onPress={() => setHabitData({ ...habitData, isPositive: true })}
                >
                    <ThemedText
                        style={[
                            styles.toggleText,
                            habitData.isPositive && styles.selectedToggleText,
                        ]}
                    >
                        Build (Positive)
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        !habitData.isPositive && styles.selectedToggleButton,
                    ]}
                    onPress={() => setHabitData({ ...habitData, isPositive: false })}
                >
                    <ThemedText
                        style={[
                            styles.toggleText,
                            !habitData.isPositive && styles.selectedToggleText,
                        ]}
                    >
                        Quit (Negative)
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top', 'left', 'right']}>
            <AppHeader
                title="New Habit"
                leftIcon="xmark"
                onLeftPress={() => router.back()}
                rightText="Save"
                onRightPress={handleSave}
                leftIconColor={null}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Habit Name</ThemedText>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter habit name..."
                        value={habitData.name}
                        onChangeText={(text) => setHabitData({ ...habitData, name: text })}
                    />
                </View>

                {renderIconSelector()}
                {renderColorSelector()}

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Category</ThemedText>
                    <View style={styles.categoryGrid}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    habitData.category === category && styles.selectedCategoryButton,
                                ]}
                                onPress={() => setHabitData({ ...habitData, category })}
                            >
                                <ThemedText
                                    style={[
                                        styles.categoryText,
                                        habitData.category === category && styles.selectedCategoryText,
                                    ]}
                                >
                                    {category}
                                </ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {renderHabitType()}

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Frequency</ThemedText>
                    {frequencies.map((freq) => (
                        <TouchableOpacity
                            key={freq.value}
                            style={styles.frequencyOption}
                            onPress={() => setHabitData({ ...habitData, frequency: freq.value })}
                        >
                            <View style={styles.radioContainer}>
                                <View style={[
                                    styles.radioButton,
                                    habitData.frequency === freq.value && styles.selectedRadioButton,
                                ]}>
                                    {habitData.frequency === freq.value && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                                <ThemedText style={styles.frequencyText}>{freq.label}</ThemedText>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {habitData.isPositive && (
                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Target per Day</ThemedText>
                        <View style={styles.targetContainer}>
                            <TouchableOpacity
                                style={styles.targetButton}
                                onPress={() => setHabitData({
                                    ...habitData,
                                    targetCount: Math.max(1, habitData.targetCount - 1)
                                })}
                            >
                                <IconSymbol name="minus" size={20} color="#007AFF" />
                            </TouchableOpacity>
                            <ThemedText style={styles.targetNumber}>{habitData.targetCount}</ThemedText>
                            <TouchableOpacity
                                style={styles.targetButton}
                                onPress={() => setHabitData({
                                    ...habitData,
                                    targetCount: habitData.targetCount + 1
                                })}
                            >
                                <IconSymbol name="plus" size={20} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Notes (Optional)</ThemedText>
                    <TextInput
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Add any notes about this habit..."
                        value={habitData.notes}
                        onChangeText={(text) => setHabitData({ ...habitData, notes: text })}
                        multiline
                        numberOfLines={3}
                    />
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#000',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    iconGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIconButton: {
        backgroundColor: '#007AFF',
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedColorButton: {
        borderWidth: 3,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
    },
    selectedCategoryButton: {
        backgroundColor: '#007AFF',
    },
    categoryText: {
        fontSize: 14,
        color: '#666',
    },
    selectedCategoryText: {
        color: 'white',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 4,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectedToggleButton: {
        backgroundColor: '#007AFF',
    },
    toggleText: {
        fontSize: 16,
        color: '#666',
    },
    selectedToggleText: {
        color: 'white',
        fontWeight: '600',
    },
    frequencyOption: {
        paddingVertical: 12,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C7C7CC',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadioButton: {
        borderColor: '#007AFF',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    frequencyText: {
        fontSize: 16,
        color: '#000',
    },
    targetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
    },
    targetButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 32,
        color: '#000',
    },
});
