import {
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from 'expo-font';

export function useLoadedFonts() {
    const [fontsLoaded, fontError] = useFonts({
        Urbanist_400Regular,
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    });

    return {
        fontsLoaded,
        fontError,
    };
}
