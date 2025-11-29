export const Theme = {
    colors: {
        primary: '#6200ee', // Default
        primaryLight: '#9fd0ff', // Lighter
        primaryDark: '#3700b3', // Darker
        outline: '#0b3a68',
        secondary: '#03dac6',
        background: '#ffffff',
        surface: '#f5f5f5',
        error: '#b00020',
        text: '#000000',
        textSecondary: '#666666',
        onPrimary: '#ffffff',
    },
    spacing: (factor: number) => factor * 4,
    typography: {
        h1: { fontSize: 32, fontWeight: 'bold' as const },
        h2: { fontSize: 24, fontWeight: 'bold' as const },
        body: { fontSize: 16, fontWeight: 'normal' as const },
        caption: { fontSize: 12, fontWeight: 'normal' as const },
    },
};
