'use client';
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import theme from '../../theme';

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const emotionCache = createEmotionCache();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}