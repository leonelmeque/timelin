import { useWindowDimensions, Platform } from 'react-native';

export type LayoutMode = 'mobile' | 'tablet' | 'desktop';

function getLayoutMode(width: number): LayoutMode {
  if (Platform.OS !== 'web') return 'mobile';
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
}

export function useResponsive() {
  const { width } = useWindowDimensions();
  const mode = getLayoutMode(width);

  return {
    mode,
    isMobile: mode === 'mobile',
    isTablet: mode === 'tablet',
    isDesktop: mode === 'desktop',
    showSidebar: mode === 'desktop' || mode === 'tablet',
    width,
  };
}
