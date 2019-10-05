import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import FlexBox from '../../Components/FlexBox';

const MoodCard = styled(FlexBox)(
  css({
    minHeight: '200px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    m: '1',
    borderRadius: 'normal',
  })
);

const MoodCards = props => {
  // eslint-disable-next-line react/prop-types
  return <MoodCard bg={`${props.bg}`}></MoodCard>;
};

export default MoodCards;
