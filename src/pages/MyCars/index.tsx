import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';

import { LoadAnimation } from '../../components/LoadAnimation';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import api from '../../services/api';
import { Car as ModelCar } from '../../database/model/Car';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface IDataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<IDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const screenIsFocused = useIsFocused();

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get('rentals');
        const dataFormatted = data.map((item: IDataProps) => {
          return {
            id: item.id,
            car: item.car,
            start_date: format(parseISO(item.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(item.end_date), 'dd/MM/yyyy'),
          }
        });

        setCars(dataFormatted)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocused])

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color={theme.colors.shape} />
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>
        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>
      </Header>

      {loading ? <LoadAnimation /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}
