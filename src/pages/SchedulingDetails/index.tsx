import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { ICarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface IParams {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);

  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const netInfo = useNetInfo();
  const { car, dates } = route.params as IParams;

  const rentTotal = Number(dates.length * car.price);

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected])

  async function handleConfirmRental() {
    setLoading(true);

    await api.post('rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    })
      .then(() => navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro alugado!',
        message: 'Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.'
      }))
      .catch(() => {
        setLoading(false);
        Alert.alert('N??o foi poss??vel confirmar o agendamento.')
      }
      )
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={
          !!carUpdated.photos ?
            carUpdated.photos : [{ id: car.id, photo: car.thumbnail }]
        } />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <Accessories>
            {carUpdated.accessories.map(accessory =>
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)} />
            )}
          </Accessories>
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          enabled={!loading}
          loading={loading}
          color={theme.colors.success}
          onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
