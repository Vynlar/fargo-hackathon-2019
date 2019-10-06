import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import Typing from 'react-typing-animation';
import { keyframes } from '@emotion/core';
import { pulse } from 'react-animations';

import Box from 'Components/Box';
import FlexBox from 'Components/FlexBox';

import Text from 'Components/Text';

const Header = () => {
  const pulseAnimation = keyframes`${pulse}`;

  const PulseDiv = styled.div`
    animation: 3s infinite ${pulseAnimation};
  `;

  const HeaderContainer = styled(Box)(
    css({
      width: '100%',
      my: 3,
      fontSize: '24px',
      color: 'darkerGrey',
      justifyContent: 'center',
    })
  );

  return (
    <FlexBox justifyContent="center">
      <Typing>
        <HeaderContainer>
          <PulseDiv>
            <Text>How are you feeling?</Text>
          </PulseDiv>
          <Text fontSize="16px">Select an option below to chat</Text>
        </HeaderContainer>
      </Typing>
    </FlexBox>
  );
};

export default Header;
