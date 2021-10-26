import styled, { css } from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface IOption {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(227)}px;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;
  align-items: center;

`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 48px;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.main};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
}) <IOption>`
  padding-bottom: 14px;

  ${({ active, theme }) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const OptionTitle = styled.Text<IOption>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ active, theme }) => active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  color: ${({ active, theme }) => active ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled.View``;

