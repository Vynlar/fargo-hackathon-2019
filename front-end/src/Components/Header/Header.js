import React from 'react';
import FlexBox from '../FlexBox/FlexBox';
import styled from '@emotion/styled';
import css from '@styled-system/css';

const Header = () => {
  const breakpoints = [1150, 950, 750];

  const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

  const HeaderContainer = styled(FlexBox)(
    css({
      width: '100%',
      my: 3,
      fontSize: 4,
      color: 'DarkerGrey',
      justifyContent: 'center',
    })
  );

  return (
    <FlexBox justifyContent="center">
      <HeaderContainer>Hey! How are you?</HeaderContainer>
    </FlexBox>
  );
};

export default Header;
