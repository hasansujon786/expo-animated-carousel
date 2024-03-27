import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import PlansScreen from './screens/plans'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Plans' component={PlansScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
