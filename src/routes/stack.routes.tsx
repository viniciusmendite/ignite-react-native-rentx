import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { CardDetails } from '../pages/CardDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingComplete } from '../pages/SchedulingComplete';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import { MyCars } from '../pages/MyCars';
import { Splash } from '../pages/Splash';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="CarDetails"
        component={CardDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="SchedulingComplete"
        component={SchedulingComplete}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  );
}