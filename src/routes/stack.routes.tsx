import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { CardDetails } from '../pages/CardDetails';
import { Scheduling } from '../pages/Scheduling';
import { Confirmation } from '../pages/Confirmation';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import { MyCars } from '../pages/MyCars';
import { SignIn } from '../pages/SignIn';
import { SignUpFirstStep } from '../pages/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../pages/SignUp/SignUpSecondStep';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
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
        name="Confirmation"
        component={Confirmation}
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