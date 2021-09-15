import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  color: string;
}

interface IButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton) <IButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => color ? color : theme.colors.main};
  margin-bottom: 8px;
`;

export const Title = styled.Text<IButtonTextProps>`
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;