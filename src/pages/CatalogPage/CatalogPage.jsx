import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { Box, ScrollView } from 'native-base';

import CatalogCategoriesCarousel from '../../components/CatalogPageComponents/CatalogCategoriesCarousel/CatalogCategoriesCarousel';
import ProductItems from '../../components/CatalogPageComponents/ProductItems';
import BasketBottomLink from '../../components/Elements/BasketBottomLink';

const CatalogPage = ({ route }) => {
  const { name, id } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    if (name) {
      navigation.setOptions({ headerTitle: name });
    }
  }, [name]);

  return (
    <>
      <Box pb='60px'>
        <CatalogCategoriesCarousel />
        <ScrollView>
          <ProductItems />
        </ScrollView>
      </Box>
      <BasketBottomLink bottom={0} />
    </>
  );
};

export default CatalogPage;
