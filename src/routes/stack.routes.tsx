import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { CardDetails } from '../pages/CardDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingComplete } from '../pages/SchedulingComplete';
import { SchedulingDetails } from '../pages/SchedulingDetails';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={Home}
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
    </Navigator>
  );
}