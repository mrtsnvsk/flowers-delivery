import React from 'react';

import { Box, ScrollView } from 'native-base';

import CatalogCategoriesCarousel from '../../components/CatalogPageComponents/CatalogCategoriesCarousel/CatalogCategoriesCarousel';
import ProductItems from '../../components/CatalogPageComponents/ProductItems';
import BasketBottomLink from '../../components/Elements/BasketBottomLink';

const CatalogPage = () => {
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
