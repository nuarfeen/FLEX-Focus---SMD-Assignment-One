import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

// Inline marker-pen effect for the one word that matters in a headline.
export default function Highlight({ children }) {
  return <Text style={styles.mark}>{` ${children} `}</Text>;
}

const styles = StyleSheet.create({
  mark: { backgroundColor: colors.highlight, color: colors.ink },
});
