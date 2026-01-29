export const useTheme = () => {
  // Navy Blue Palette
  const primary = {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#4a6fa5',
    700: '#3c5f7d',
    800: '#334e68',
    900: '#243b53',
    950: '#1a2b3d',
  };

  // Grey Palette
  const secondary = {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  };

  // Accent colors
  const accent = {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  };

  const colors = {
    primary,
    secondary,
    accent,
    white: '#ffffff',
    black: '#000000',
  };

  // Professional gradients
  const gradients = {
    primary: 'linear-gradient(135deg, #1e293b 0%, #334e68 50%, #475569 100%)',
    secondary: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
    accent: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
    darkCard: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 104, 0.8) 100%)',
    hero: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334e68 100%)',
    overlay: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
  };

  // Professional shadows
  const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    colored: {
      navy: '0 4px 14px 0 rgba(51, 78, 104, 0.3)',
      blue: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
      grey: '0 4px 14px 0 rgba(100, 116, 139, 0.3)',
    },
  };

  // Consistent spacing
  const spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  };

  // Professional animations
  const animations = {
    fadeIn: 'fadeIn 0.6s ease-out',
    slideUp: 'slideUp 0.6s ease-out',
    slideDown: 'slideDown 0.6s ease-out',
    slideLeft: 'slideLeft 0.6s ease-out',
    slideRight: 'slideRight 0.6s ease-out',
    scale: 'scale 0.6s ease-out',
    rotate: 'rotate 0.6s ease-out',
    bounce: 'bounce 0.6s ease-out',
    pulse: 'pulse 2s infinite',
  };

  // Border radius
  const borderRadius = {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  };

  // Typography scale
  const typography = {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  };

  return {
    colors,
    gradients,
    shadows,
    spacing,
    animations,
    borderRadius,
    typography,
    theme: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.black,
      foreground: colors.white,
      muted: colors.secondary[500],
    }
  };
};
