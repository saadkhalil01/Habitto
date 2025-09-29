// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  // Tab bar icons
  'sun.max.fill': 'today',
  'checkmark.circle.fill': 'check-circle-outline',
  'chart.line.uptrend.xyaxis': 'bar-chart',
  'person.circle.fill': 'account-circle',
  // Header and UI icons
  'plus': 'add',
  'xmark': 'close',
  'pencil': 'edit',
  'trash': 'delete',
  'checkmark': 'check',
  'calendar': 'event',
  'list.bullet': 'format-list-bulleted',
  'chart.bar.fill': 'bar-chart',
  'person.fill': 'person',
  // Habit icons
  'drop.fill': 'water-drop',
  'figure.run': 'directions-run',
  'book.fill': 'menu-book',
  'cup.and.straw': 'local-drink',
  'moon.fill': 'bedtime',
  'leaf.fill': 'eco',
  'heart.fill': 'favorite',
  'brain.head.profile': 'psychology',
  'music.note': 'music-note',
  'camera.fill': 'photo-camera',
  'gamecontroller.fill': 'sports-esports',
  'phone.down.fill': 'phone-disabled',
  'dollarsign.circle.fill': 'attach-money',
  'minus': 'remove',
  'star.fill': 'star',
  'star': 'star-border',
  'envelope': 'email',
  'questionmark.circle': 'help',
  'lock': 'lock-outline',
  'bell': 'notifications-none',
  'person.circle': 'account-circle',
  'moon': 'brightness-2',
  'speaker.wave.2': 'volume-up',
  'hand.tap': 'touch-app',
  'icloud.and.arrow.up': 'cloud-upload',
  'square.and.arrow.up': 'share',
} as unknown as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
