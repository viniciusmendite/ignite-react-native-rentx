import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  color: string;
}

export const Container = styled(RectButton) <IButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => color ? color : theme.colors.main};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;