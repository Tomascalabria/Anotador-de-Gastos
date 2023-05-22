import { extendTheme } from '@chakra-ui/react';
import italic from '../Fonts/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Regular.woff';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: '#FF0000', // Custom primary color
    background: '#F5F5F5', // Custom light background color
    dark: {
      background: '#2A2A2A', // Custom dark background color
      // Add more custom colors for dark mode if needed
    },
    // Add more custom colors here
  },
  fonts: {
    body: 'Arial, sans-serif', // Default font for body text
    heading: 'Georgia, serif', // Default font for headings
  },
  fontSizes: {
    sm: '12px', // Small font size
    md: '16px', // Medium font size
    lg: '20px', // Large font size
  },
  fontWeights: {
    normal: 400, // Normal font weight
    bold: 700, // Bold font weight
  },
  styles: {
    global: {
      '@font-face': [
        {
          fontFamily: 'GeneralSans-Regular',
          src: `url(${italic}) format('woff')`,
        },
      ],
      body: {
        background: 'background', // Set background color using the custom color name
        fontFamily: 'GeneralSans-Regular', // Use the custom font family
      },
      // Add more global styles as needed
    },
  },
});

export default theme;
