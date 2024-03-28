import { StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { plansData } from '../plans'
import Card from './Card'

const CardView = ({ height, width, panGesture, cardAnimatedStyles }) => {
  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, { minHeight: height }]}>
        {plansData.map((plan, index) => (
          <Animated.View
            key={plan.id}
            renderToHardwareTextureAndroid // <- this animates borderRadius correctly on older android versions
            style={[{ height: height, width: width, position: 'absolute' }, cardAnimatedStyles[index]]}
          >
            <Card {...plan} height={height} width={width} />
          </Animated.View>
        ))}
      </View>
    </GestureDetector>
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
