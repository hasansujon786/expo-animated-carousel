import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const GradientButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
      <LinearGradient
        style={styles.button}
        colors={['#f97471', '#51AEFF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.buttonLabel}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'pink',
    padding: 16,
    margin: 30,
    borderRadius: 12,
  },
  buttonLabel: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
