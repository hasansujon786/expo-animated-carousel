import Constants from 'expo-constants'
import { useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { AnimatedRadialBg } from '../components/AnimatedRadialBg'
import CardView from '../components/CardView'
import GradientButton from '../components/GradientButton'
import ListView from '../components/ListView'
import { plansData } from '../plans'

const CARD_WIDTH = Dimensions.get('window').width - 50
const CARD_HEIGHT = CARD_WIDTH / 1.4
const CARD_WIDTH_HALF = CARD_WIDTH / 2
const CARD_OFFSET = 32
const SLIDE_RANGE = CARD_WIDTH_HALF - CARD_OFFSET

const APP_BG = '#0F0E26'

export default function Plans() {
  const [curListIndex, setCurListIndex] = useState(0)

  const onContinue = () => {
    Alert.alert(`planIndex : ${curListIndex}`)
  }

  const activeIndex = useSharedValue(0)
  const absoluteIndex = useSharedValue(0)

  const position = useSharedValue(0)
  const oneX = useSharedValue(0)
  const twoX = useSharedValue(0)
  const threeX = useSharedValue(0)
  const oneZindex = useSharedValue(100)
  const twoZindex = useSharedValue(0)
  const threeZindex = useSharedValue(0)

  const flingLeftNext = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      const translationX = -SLIDE_RANGE

      if (absoluteIndex.value == 0) {
        oneX.value = translationX
        twoX.value = translationX * -1

        twoZindex.value = 50
        threeZindex.value = -100
      } else if (absoluteIndex.value == 1) {
        twoX.value = translationX
        threeX.value = translationX * -1

        threeZindex.value = 50
        oneZindex.value = -100
      } else if (absoluteIndex.value == 2) {
        threeX.value = translationX
        oneX.value = translationX * -1

        oneZindex.value = 50
        twoZindex.value = -100
      }

      if (absoluteIndex.value >= 2) {
        // next reset
        activeIndex.value = withTiming(0, { duration: 300 })
        absoluteIndex.value = 0
      } else {
        // next
        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 300 })
        absoluteIndex.value += 1
      }

      runOnJS(setCurListIndex)(absoluteIndex.value)
      oneX.value = withTiming(0, { duration: 300 })
      twoX.value = withTiming(0, { duration: 300 })
      threeX.value = withTiming(0, { duration: 300 })
    })

  const flingRightPrevious = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      const translationX = SLIDE_RANGE

      if (absoluteIndex.value == 0) {
        oneX.value = translationX
        threeX.value = translationX * -1

        twoZindex.value = -100
        threeZindex.value = 50
      } else if (absoluteIndex.value == 1) {
        twoX.value = translationX
        oneX.value = translationX * -1

        oneZindex.value = 50
        threeZindex.value = -100
      } else if (absoluteIndex.value == 2) {
        threeX.value = translationX
        twoX.value = translationX * -1

        twoZindex.value = 50
        oneZindex.value = -100
      }

      if (absoluteIndex.value <= 0) {
        // previous reset
        activeIndex.value = withTiming(2, { duration: 300 })
        absoluteIndex.value = 2
      } else {
        // previous
        activeIndex.value = withTiming(activeIndex.value - 1, { duration: 300 })
        absoluteIndex.value -= 1
      }

      runOnJS(setCurListIndex)(absoluteIndex.value)
      oneX.value = withTiming(0, { duration: 300 })
      twoX.value = withTiming(0, { duration: 300 })
      threeX.value = withTiming(0, { duration: 300 })
    })

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      let translationX = CARD_WIDTH_HALF

      // clamp
      if (e.translationX >= 0 && e.translationX < CARD_WIDTH_HALF) {
        translationX = e.translationX
      } else if (e.translationX <= 0) {
        if (e.translationX * -1 < CARD_WIDTH_HALF) {
          translationX = e.translationX
        } else {
          translationX = -CARD_WIDTH_HALF
        }
      }

      const isNext = translationX < 0

      if (absoluteIndex.value == 0) {
        oneX.value = translationX

        if (isNext) {
          twoX.value = translationX * -1

          twoZindex.value = 50
          threeZindex.value = -100
        } else {
          threeX.value = translationX * -1

          twoZindex.value = -100
          threeZindex.value = 50
        }
      } else if (absoluteIndex.value == 1) {
        twoX.value = translationX
        if (isNext) {
          threeX.value = translationX * -1

          threeZindex.value = 50
          oneZindex.value = -100
        } else {
          oneX.value = translationX * -1

          oneZindex.value = 50
          threeZindex.value = -100
        }
      } else if (absoluteIndex.value == 2) {
        threeX.value = translationX
        if (isNext) {
          oneX.value = translationX * -1

          oneZindex.value = 50
          twoZindex.value = -100
        } else {
          twoX.value = translationX * -1

          twoZindex.value = 50
          oneZindex.value = -100
        }
      }

      position.value = translationX
    })
    .onEnd(() => {
      if (position.value > SLIDE_RANGE) {
        if (absoluteIndex.value <= 0) {
          // previous reset
          activeIndex.value = withTiming(2, { duration: 300 })
          absoluteIndex.value = 2
        } else {
          // previous
          activeIndex.value = withTiming(activeIndex.value - 1, { duration: 300 })
          absoluteIndex.value -= 1
        }

        runOnJS(setCurListIndex)(absoluteIndex.value)
      } else if (position.value * -1 > SLIDE_RANGE) {
        if (absoluteIndex.value >= 2) {
          // next reset
          activeIndex.value = withTiming(0, { duration: 300 })
          absoluteIndex.value = 0
        } else {
          // next
          activeIndex.value = withTiming(activeIndex.value + 1, { duration: 300 })
          absoluteIndex.value += 1
        }

        runOnJS(setCurListIndex)(absoluteIndex.value)
      }

      oneX.value = withTiming(0, { duration: 300 })
      twoX.value = withTiming(0, { duration: 300 })
      threeX.value = withTiming(0, { duration: 300 })
    })

  const oneStyle = useAnimatedStyle(() => ({
    zIndex: interpolate(absoluteIndex.value, [0, 1, 2], [300, oneZindex.value, oneZindex.value]),
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(
          oneX.value,
          [CARD_WIDTH_HALF, 0, -CARD_WIDTH_HALF],
          [-35, 0, 35],
          Extrapolation.EXTEND
        )}deg`,
      },
      { translateX: interpolate(activeIndex.value, [0, 1, 2], [0, -CARD_OFFSET, CARD_OFFSET]) },
      { translateX: oneX.value },
      { scale: interpolate(activeIndex.value, [0, 1, 2], [1, 0.9, 0.9]) },
    ],
  }))
  const twoStyle = useAnimatedStyle(() => ({
    zIndex: interpolate(absoluteIndex.value, [0, 1, 2], [twoZindex.value, 300, twoZindex.value]),
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(
          twoX.value,
          [CARD_WIDTH_HALF, 0, -CARD_WIDTH_HALF],
          [-35, 0, 35],
          Extrapolation.EXTEND
        )}deg`,
      },
      { translateX: interpolate(activeIndex.value, [0, 1, 2], [CARD_OFFSET, 0, -CARD_OFFSET]) },
      { translateX: twoX.value },
      { scale: interpolate(activeIndex.value, [0, 1, 2], [0.9, 1, 0.9]) },
    ],
  }))
  const threeStyle = useAnimatedStyle(() => ({
    zIndex: interpolate(absoluteIndex.value, [0, 1, 2], [threeZindex.value, threeZindex.value, 300]),
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(
          threeX.value,
          [CARD_WIDTH_HALF, 0, -CARD_WIDTH_HALF],
          [-35, 0, 35],
          Extrapolation.EXTEND
        )}deg`,
      },
      { translateX: interpolate(activeIndex.value, [0, 1, 2], [-CARD_OFFSET, CARD_OFFSET, 0]) },
      { translateX: threeX.value },
      { scale: interpolate(activeIndex.value, [0, 1, 2], [0.9, 0.9, 1]) },
    ],
  }))
  let cardAnimatedStyles = [oneStyle, twoStyle, threeStyle]

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AnimatedRadialBg theme={plansData[curListIndex]?.theme} background={APP_BG}>
        <Text style={styles.topHeading}>Choissisez un plan</Text>
        <Text style={styles.topSubtitle}>Swiper les differentes cartes afin de choisir le plan qui vous conviens</Text>

        <GestureDetector gesture={Gesture.Exclusive(flingLeftNext, flingRightPrevious)}>
          <View style={{ flex: 1 }}>
            <CardView
              height={CARD_HEIGHT}
              width={CARD_WIDTH}
              panGesture={panGesture}
              cardAnimatedStyles={cardAnimatedStyles}
            />
            <ListView currentIndex={curListIndex} />
          </View>
        </GestureDetector>

        <View style={{ marginTop: 'auto' }}>
          <GradientButton onPress={onContinue}>Suivant</GradientButton>
        </View>
      </AnimatedRadialBg>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  topHeading: {
    color: 'white',
    textAlign: 'center',
    marginTop: Constants.statusBarHeight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  topSubtitle: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
