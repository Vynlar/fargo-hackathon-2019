import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import FlexBox from '../../Components/FlexBox';
import Header from '../../Components/Header';
import MoodBoard from '../../Components/MoodBoard';
import ConversationButton from 'Components/ConversationButton';

const MainContainer = styled(FlexBox)(
  css({
    minHeight: '100vh',
    width: '100%',
    bg: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  })
);

const Main = () => {
  return (
    <FlexBox justifyContent="center">
      <MainContainer>
        <Header marginBottom={8} />
        <MoodBoard />
        <ConversationButton />
      </MainContainer>
    </FlexBox>
  );
};

export default Main;
