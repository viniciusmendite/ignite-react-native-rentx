import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

interface IBackButton extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: IBackButton) {
  const theme = useTheme();
  const { goBack } = useNavigation();

  return (
    <Container {...rest} onPress={goBack}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  );
}