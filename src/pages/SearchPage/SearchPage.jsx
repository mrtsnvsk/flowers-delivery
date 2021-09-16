import React, { useState } from 'react';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Center, Image, Actionsheet } from 'native-base';

import SearchFilterCarousel from '../../components/SearchPageComponents/SearchFilterCarousel';

import { clearSearchImg } from '../../resources/images';
import SearchFilterActionSheet from '../../components/SearchPageComponents/SearchFilterActionSheet';
import SearchItems from '../../components/SearchPageComponents/SearchItems/SearchItems';

const SearchPage = () => {
  const [showActionsheet, setShowActionSheet] = useState(false);
  const [termCategory, setTermCategory] = useState(null);
  const [term, setTerm] = useState('');

  const menu = [
    {
      name: 'Акции',
    },
    {
      name: 'Розы',
    },
    {
      name: 'Цветы',
    },
    {
      name: 'Вазы',
    },
  ];

  const characters = [
    {
      name: 'Красный',
    },
    {
      name: 'Синий',
    },
  ];
  const img =
    'https://st.volga.news/image/w630/413ab04d-ddc8-4c46-a697-016be62026b2.jpg';

  const searchItems = [
    {
      name: 'Моно Deep Purple M',
      price: 1300,
      img,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur repellat, reprehenderit et sunt delectus voluptates alias soluta exercitationem error asperiores placeat laudantium eveniet laboriosam dolorem pariatur maiores officiis ipsa? Saepe!',
    },
    {
      name: 'Mono Deep Purple S',
      price: 1300,
      img,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur repellat, reprehenderit et sunt delectus voluptates alias soluta exercitationem error asperiores placeat laudantium eveniet laboriosam dolorem pariatur maiores officiis ipsa? Saepe!',
    },
    {
      name: 'Букет из 1010 красной розы',
      price: 1300,
      img,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur repellat, reprehenderit et sunt delectus voluptates alias soluta exercitationem error asperiores placeat laudantium eveniet laboriosam dolorem pariatur maiores officiis ipsa? Saepe!',
    },
    {
      name: 'Moho Kahala и эвкалипт',
      price: 1300,
      img,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur repellat, reprehenderit et sunt delectus voluptates alias soluta exercitationem error asperiores placeat laudantium eveniet laboriosam dolorem pariatur maiores officiis ipsa? Saepe!',
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box bg='#fff' flex={1}>
        <SearchFilterCarousel
          termCategory={termCategory}
          setTermCategory={setTermCategory}
          openFilters={() => setShowActionSheet(true)}
        />
        {!termCategory?.name || !searchItems.length ? (
          <Center flex={1}>
            <Image
              resizeMode='stretch'
              w={240}
              height={300}
              source={clearSearchImg}
              alt='Поиск товаров'
            />
          </Center>
        ) : (
          <SearchItems products={searchItems} />
        )}

        <Actionsheet
          isOpen={showActionsheet}
          onClose={() => setShowActionSheet(false)}
        >
          <Actionsheet.Content alignItems='flex-start' px={'20px'} pb={'20px'}>
            <SearchFilterActionSheet
              setTermCategory={setTermCategory}
              label={'Меню'}
              items={menu}
            />
            <SearchFilterActionSheet
              withFilters={true}
              setTermCategory={setTermCategory}
              label={'Характеристики'}
              items={characters}
            />
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default SearchPage;
