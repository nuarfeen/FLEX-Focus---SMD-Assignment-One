// Design tokens. Signature: a "highlighter" yellow used like a study marker, on ink + chalk.
export const colors = {
  canvas: '#EDEFF7', paper: '#FFFFFF', ink: '#17163A', muted: '#6B6F8D', line: '#DDE0EE',
  highlight: '#FFD93D', action: '#4F46E5', actionSoft: '#E9E8FF',
  safe: '#14A36B', safeSoft: '#DDF4EA', alert: '#F0553F', alertSoft: '#FDE5E1', warnSoft: '#FFF3C4',
};

// Display = Bricolage Grotesque, body = DM Sans, numbers/labels = DM Mono.
// Weights are baked into the family names (fontWeight is unreliable with custom fonts on Android).
export const fonts = {
  display: 'BricolageGrotesque_800ExtraBold',
  displayMid: 'BricolageGrotesque_700Bold',
  body: 'DMSans_400Regular',
  bodyBold: 'DMSans_700Bold',
  mono: 'DMMono_400Regular',
  monoBold: 'DMMono_500Medium',
};

export const radius = { card: 20, small: 12, pill: 999 };

export const chartConfig = {
  backgroundGradientFrom: '#FFFFFF', backgroundGradientTo: '#FFFFFF', decimalPlaces: 0,
  color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(107, 111, 141, ${opacity})`,
  propsForDots: { r: '5', strokeWidth: '3', stroke: '#FFD93D' },
  propsForBackgroundLines: { stroke: '#EDEFF7', strokeDasharray: '' },
  propsForLabels: { fontFamily: 'DMMono_400Regular', fontSize: 10 },
  barPercentage: 0.5,
};
