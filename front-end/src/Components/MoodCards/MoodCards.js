/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import FlexBox from '../../Components/FlexBox';

const MoodCard = styled(FlexBox)(
  css({
    height: '130px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '250px',
    m: '1',
    borderRadius: 'normal',
    fontSize: '75px',
    ':hover': css({
      boxShadow: '0px 0px 10px 0px rgb(0, 0, 0, .75);',
    }),
    ':active': css({
      boxShadow: '0 0px',
    }),
  })
);

const MoodCards = props => {
  // eslint-disable-next-line react/prop-types
  return (
    <MoodCard bg={`${props.bg}`}>
      <p>{props.emoji}</p>
    </MoodCard>
  );
};

export default MoodCards;
