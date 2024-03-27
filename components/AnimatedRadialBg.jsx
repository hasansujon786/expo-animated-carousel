import { StyleSheet, View } from 'react-native'
import { Defs, Rect, RadialGradient as SVGRadialGradient, Stop, Svg } from 'react-native-svg'

export const defalutTheme = {
  primary: '#FFBF85',
  secondary: '#FFA490',
  tertiary: '#FF7A00',
  background: '#FFCFA3',
  foreground: '#343434',
}

export const AnimatedRadialBg = ({ background = '#0F0E26', theme = defalutTheme, children }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <View style={[styles.gradientBg, { backgroundColor: background }]}>
        <RadialGradientBox // top-right
          height={600}
          width={200}
          stopOpacity={0.4}
          style={{ right: 0, top: 0, position: 'absolute' }}
          gradientTransform={`translate(220 230) rotate(90) scale(200)`}
          foreground={theme.primary}
          background={background}
          // background={'gray'}
        />
        <RadialGradientBox // bottom-left
          height={200}
          width={300}
          stopOpacity={0.3}
          style={{ left: 0, bottom: 0, position: 'absolute' }}
          gradientTransform={`translate(75 220) rotate(90) scale(200)`}
          foreground={theme.secondary}
          background={background}
        />
      </View>
    </View>
  )
}

export const RadialGradientBox = ({ gradientTransform, background, foreground, stopOpacity = 0.7, ...props }) => {
  return (
    <Svg {...props}>
      <Rect width='100%' height='100%' fill='url(#grad)'></Rect>
      <Defs>
        <SVGRadialGradient
          id='grad'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform={gradientTransform}
        >
          <Stop stopColor={foreground} stopOpacity={stopOpacity} />
          <Stop stopColor={background} offset={1} />
        </SVGRadialGradient>
      </Defs>
    </Svg>
  )
}

const styles = StyleSheet.create({
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -300,
    flex: 1,
  },
})
