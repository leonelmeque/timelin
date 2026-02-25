import { useWindowDimensions, Platform } from 'react-native';

export type LayoutMode = 'mobile' | 'tablet' | 'desktop';

export function useResponsive() {
  const { width } = useWindowDimensions();

  const mode: LayoutMode =
    Platform.OS !== 'web' ? 'mobile' :
    width >= 1024 ? 'desktop' :
    width >= 768 ? 'tablet' :
    'mobile';

  return {
    mode,
    isMobile: mode === 'mobile',
    isTablet: mode === 'tablet',
    isDesktop: mode === 'desktop',
    showSidebar: mode === 'desktop' || mode === 'tablet',
    width,
  };
}
