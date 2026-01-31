import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export interface ScreenSize {
  width: number;
  height: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isTablet: boolean;
  scale: number;
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width,
    height,
    isSmall: height < 700,
    isMedium: height >= 700 && height < 800,
    isLarge: height >= 800,
    isTablet: width >= 768,
    scale: 1,
  });

  useEffect(() => {
    const onChange = (result: any) => {
      const { width: newWidth, height: newHeight } = result.window;
      const scale = newWidth < 375 ? 0.85 : newWidth < 400 ? 0.9 : 1;
      
      setScreenSize({
        width: newWidth,
        height: newHeight,
        isSmall: newHeight < 700,
        isMedium: newHeight >= 700 && newHeight < 800,
        isLarge: newHeight >= 800,
        isTablet: newWidth >= 768,
        scale,
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
  }, []);

  return screenSize;
};