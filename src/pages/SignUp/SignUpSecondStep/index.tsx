import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { useRoute, useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';
import api from '../../../services/api';

interface IParams {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const { user: { name, email, driverLicense } } = route.params as IParams;

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    await api.post('/users', {
      name,
      email,
      driver_license: driverLicense,
      password,
    })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'SignIn',
          title: 'Conta Criada',
          message: 'Agora é só fazer login\ne aproveitar'
        });
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar')
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>02. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button color={theme.colors.success} title="Próximo" onPress={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}