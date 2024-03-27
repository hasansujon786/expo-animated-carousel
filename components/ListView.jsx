import React from 'react'
import { Easing, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, SlideInDown, SlideOutDown, SlideOutRight } from 'react-native-reanimated'
import { plansData } from '../plans'

const ListView = ({ currentIndex = 0 }) => {
  return (
    <View style={{ flex: 1 }}>
      {plansData.map((plan, i) => currentIndex == i && <Heading key={plan.id} title={plan.title} />)}

      {plansData.map(
        (data, i) =>
          currentIndex == i && (
            <Animated.FlatList
              key={data.id}
              data={data.items}
              entering={SlideInDown}
              exiting={SlideOutDown}
              contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
              renderItem={ListItem}
            />
          )
      )}
    </View>
  )
}
export default ListView

const Heading = ({ title }) => {
  return (
    <Animated.Text
      entering={FadeIn.delay(200)}
      exiting={SlideOutRight.easing(Easing.in()).duration(280)}
      style={styles.heading}
    >
      Explorer les avantages du plan {title}
    </Animated.Text>
  )
}

const ListItem = ({ item, index }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text style={styles.listSubTitle}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 16,
  },
  listItem: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(56,53,56,0.4)',
    minHeight: 80,
  },
  emoji: {
    fontSize: 30,
  },
  listTitle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 16,
    fontSize: 16,
  },
  listSubTitle: {
    marginTop: 4,
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
})
