export function detectPlatform() {
    if (typeof document !== 'undefined') {
        return 'browser';
    }

    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return 'react-native';
    }

    return 'node';
}