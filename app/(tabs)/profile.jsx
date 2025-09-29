import Header from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock user data
const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2024-01-01',
    totalHabits: 12,
    completedToday: 8,
    longestStreak: 45,
    totalCompletions: 287,
};

const settingsSections = [
    {
        title: 'Account',
        items: [
            { id: 'profile', title: 'Edit Profile', icon: 'person.circle', type: 'navigation' },
            { id: 'notifications', title: 'Notifications', icon: 'bell', type: 'navigation' },
            { id: 'privacy', title: 'Privacy', icon: 'lock', type: 'navigation' },
        ],
    },
    {
        title: 'Preferences',
        items: [
            { id: 'theme', title: 'Dark Mode', icon: 'moon', type: 'toggle' },
            { id: 'sounds', title: 'Sound Effects', icon: 'speaker.wave.2', type: 'toggle' },
            { id: 'haptics', title: 'Haptic Feedback', icon: 'hand.tap', type: 'toggle' },
        ],
    },
    {
        title: 'Data',
        items: [
            { id: 'backup', title: 'Backup Data', icon: 'icloud.and.arrow.up', type: 'navigation' },
            { id: 'export', title: 'Export Data', icon: 'square.and.arrow.up', type: 'navigation' },
            { id: 'reset', title: 'Reset All Data', icon: 'trash', type: 'destructive' },
        ],
    },
    {
        title: 'Support',
        items: [
            { id: 'help', title: 'Help Center', icon: 'questionmark.circle', type: 'navigation' },
            { id: 'feedback', title: 'Send Feedback', icon: 'envelope', type: 'navigation' },
            { id: 'rate', title: 'Rate App', icon: 'star', type: 'navigation' },
        ],
    },
];

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const [settings, setSettings] = useState({
        theme: colorScheme === 'dark',
        sounds: true,
        haptics: true,
    });

    const handleSettingToggle = (settingId) => {
        setSettings(prev => ({
            ...prev,
            [settingId]: !prev[settingId],
        }));
    };

    const handleSettingPress = (item) => {
        switch (item.type) {
            case 'toggle':
                handleSettingToggle(item.id);
                break;
            case 'navigation':
                Alert.alert(item.title, `This would navigate to ${item.title} screen`);
                break;
            case 'destructive':
                Alert.alert(
                    item.title,
                    'Are you sure? This action cannot be undone.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Confirm', style: 'destructive' },
                    ]
                );
                break;
        }
    };

    const renderUserProfile = () => (
        <ThemedView style={styles.profileSection}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <IconSymbol name="person.circle.fill" size={80} color={'grey'} />
                </View>
                <View style={styles.profileInfo}>
                    <ThemedText style={styles.userName}>{mockUser.name}</ThemedText>
                    <ThemedText style={styles.userEmail}>{mockUser.email}</ThemedText>
                    <ThemedText style={styles.joinDate}>
                        Member since {new Date(mockUser.joinDate).toLocaleDateString()}
                    </ThemedText>
                </View>
            </View>
        </ThemedView>
    );

    const renderStats = () => (
        <ThemedView style={styles.statsSection}>
            <ThemedText style={styles.sectionTitle}>Your Stats</ThemedText>
            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>{mockUser.totalHabits}</ThemedText>
                    <ThemedText style={styles.statLabel}>Total Habits</ThemedText>
                </View>
                <View style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>{mockUser.completedToday}</ThemedText>
                    <ThemedText style={styles.statLabel}>Completed Today</ThemedText>
                </View>
                <View style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>{mockUser.longestStreak}</ThemedText>
                    <ThemedText style={styles.statLabel}>Longest Streak</ThemedText>
                </View>
                <View style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>{mockUser.totalCompletions}</ThemedText>
                    <ThemedText style={styles.statLabel}>Total Completions</ThemedText>
                </View>
            </View>
        </ThemedView>
    );

    const renderSettingsSection = (section) => (
        <ThemedView key={section.title} style={styles.settingsSection}>
            <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
            {section.items.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.settingItem}
                    onPress={() => handleSettingPress(item)}
                >
                    <View style={styles.settingLeft}>
                        <IconSymbol
                            name={item.icon}
                            size={24}
                            color={item.type === 'destructive' ? '#FF3B30' : Colors[colorScheme ?? 'light'].icon}
                        />
                        <ThemedText
                            style={[
                                styles.settingTitle,
                                item.type === 'destructive' && styles.destructiveText,
                            ]}
                        >
                            {item.title}
                        </ThemedText>
                    </View>

                    <View style={styles.settingRight}>
                        {item.type === 'toggle' ? (
                            <Switch
                                value={settings[item.id]}
                                onValueChange={() => handleSettingToggle(item.id)}
                                trackColor={{ false: '#E5E5E5', true: '#007AFF' }}
                                thumbColor={settings[item.id] ? '#FFFFFF' : '#FFFFFF'}
                            />
                        ) : (
                            <IconSymbol
                                name="chevron.right"
                                size={16}
                                color={Colors[colorScheme ?? 'light'].icon}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </ThemedView>
    );

    const renderSignOutButton = () => (
        <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?')}
        >
            <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top', 'left', 'right']}>
            <Header title="Profile" />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {renderUserProfile()}
                {renderStats()}

                {settingsSections.map(renderSettingsSection)}

                {renderSignOutButton()}

                <View style={styles.appVersion}>
                    <ThemedText style={styles.versionText}>
                        Habitto v1.0.0
                    </ThemedText>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    profileSection: {
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
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 24,
        fontFamily: Fonts?.bold || 'System',
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#000',
    },
    userEmail: {
        fontSize: 16,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
        marginBottom: 4,
    },
    joinDate: {
        fontSize: 14,
        fontFamily: Fonts?.regular || 'System',
        color: '#999',
    },
    statsSection: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
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
        fontSize: 18,
        fontFamily: Fonts?.semiBold || 'System',
        fontWeight: '600',
        marginBottom: 16,
        color: '#000',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statItem: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 16,
    },
    statNumber: {
        fontSize: 28,
        fontFamily: Fonts?.bold || 'System',
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        fontFamily: Fonts?.regular || 'System',
        color: '#666',
        textAlign: 'center',
    },
    settingsSection: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
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
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontFamily: Fonts?.regular || 'System',
        marginLeft: 12,
        color: '#000',
    },
    destructiveText: {
        color: '#FF3B30',
    },
    settingRight: {
        marginLeft: 16,
    },
    signOutButton: {
        backgroundColor: '#FF3B30',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    signOutText: {
        color: 'white',
        fontSize: 16,
        fontFamily: Fonts?.semiBold || 'System',
        fontWeight: '600',
    },
    appVersion: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    versionText: {
        fontSize: 14,
        fontFamily: Fonts?.regular || 'System',
        color: '#999',
    },
});
