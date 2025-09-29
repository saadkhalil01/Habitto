import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Header({
    title,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    rightText,
    leftIconColor,
    rightIconColor
}) {
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[
            styles.header,
            { backgroundColor: colorScheme === 'dark' ? '#000' : 'white' }
        ]}>
            <View style={styles.leftSection}>
                {leftIcon && (
                    <TouchableOpacity
                        onPress={onLeftPress}
                        style={leftIconColor === null ? styles.plainIconButton : styles.iconButton}
                    >
                        <IconSymbol
                            name={leftIcon}
                            size={24}
                            color={leftIconColor === null ? (colorScheme === 'dark' ? '#fff' : '#000') : (leftIconColor || 'white')}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.centerSection}>
                <ThemedText style={[
                    styles.title,
                    { color: colorScheme === 'dark' ? '#fff' : '#000' }
                ]}>
                    {title}
                </ThemedText>
            </View>

            <View style={styles.rightSection}>
                {rightIcon && (
                    <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                        <IconSymbol
                            name={rightIcon}
                            size={24}
                            color={rightIconColor || 'white'}
                        />
                    </TouchableOpacity>
                )}
                {rightText && (
                    <TouchableOpacity onPress={onRightPress}>
                        <ThemedText style={styles.rightTextButton}>
                            {rightText}
                        </ThemedText>
                    </TouchableOpacity>
                )}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        paddingHorizontal: 20,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts?.bold || 'System',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plainIconButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightTextButton: {
        fontSize: 16,
        fontFamily: Fonts?.semiBold || 'System',
        fontWeight: '600',
        color: '#007AFF',
    },
});


