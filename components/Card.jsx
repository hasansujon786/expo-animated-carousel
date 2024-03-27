import { StyleSheet, Text, View } from 'react-native'
import { RadialGradientBox, defalutTheme } from './AnimatedRadialBg'

const Card = ({ title, emoji, imageName, price, slogan, theme = defalutTheme, height, width }) => {
  return (
    <View style={[styles.cardBg, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.foreground }]}>{price}</Text>
      <Text style={styles.cardImg}>{emoji}</Text>
      <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
      <Text style={[styles.subTitle, { color: theme.foreground }]}>{slogan}</Text>

      <View
        style={[
          styles.gradientContainer,
          {
            width: width,
            height: height,
            backgroundColor: theme.background,
          },
        ]}
      >
        <RadialGradientBox // bottom
          height={height}
          width={width}
          style={{ left: 0, bottom: 0, position: 'absolute' }}
          gradientTransform={`translate(${width / 2} ${height * 1.2}) rotate(90) scale(130)`}
          foreground={theme.tertiary}
          background={theme.background}
        />

        <RadialGradientBox // right
          height={height / 2}
          width={height}
          style={{ right: 0, position: 'absolute' }}
          gradientTransform={`translate(${height * 1.1} 10) rotate(90) scale(100)`}
          foreground={theme.primary}
          background={theme.background}
        />

        <RadialGradientBox // left
          stopOpacity={theme.background == '#FF7575' ? 0.3 : 0.7}
          height={height / 2}
          width={height}
          style={{ left: 0, position: 'absolute' }}
          gradientTransform={`translate(0 10) rotate(90) scale(100)`}
          foreground={theme.secondary}
          background={theme.background}
        />
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardBg: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  gradientContainer: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  cardImg: {
    fontSize: 36,
  },
})
