import { StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { plansData } from '../plans'
import Card from './Card'

const CardView = ({ height, width, panGesture, cardAnimatedStyles }) => {
  return (
    <View style={[styles.container, { minHeight: height }]}>
      {plansData.map((plan, index) => (
        <GestureDetector key={plan.id} gesture={panGesture}>
          <Animated.View
            renderToHardwareTextureAndroid // <- this animates borderRadius correctly on older android versions
            style={[{ height: height, width: width, position: 'absolute' }, cardAnimatedStyles[index]]}
          >
            <Card {...plan} height={height} width={width} />
          </Animated.View>
        </GestureDetector>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
})

export default CardView
