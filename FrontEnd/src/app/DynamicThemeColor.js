import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const DynamicThemeColor = () => {
  const theme = useTheme();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.palette.primary.main);
    }
  }, [theme]);

  return null; // This component only performs the side effect
};

export default DynamicThemeColor;
