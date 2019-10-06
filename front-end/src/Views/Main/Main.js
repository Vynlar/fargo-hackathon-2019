import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import FlexBox from '../../Components/FlexBox';
import Header from '../../Components/Header';
import MatchBoard from '../../Components/MatchBoard';
import MoodBoard from '../../Components/MoodBoard';
import ConversationButton from 'Components/ConversationButton';

const breakpoints = [1150, 950, 850];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const MainContainer = styled(FlexBox)(
  css({
    minHeight: '100vh',
    width: '70%',
    bg: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    [mq[0]]: {
      width: '85%',
    },
    [mq[1]]: {
      width: '100%',
    },
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
