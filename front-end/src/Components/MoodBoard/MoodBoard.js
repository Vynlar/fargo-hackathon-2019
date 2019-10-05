import React from 'react';
import MoodCards from '../MoodCards';
import FlexBox from '../../Components/FlexBox';
import { Link } from 'react-router-dom';

const MoodBoard = () => {
  const bgColors = [0, 1, 2, 3, 4];

  return (
    <FlexBox flexDirection="column" alignItems="center" mb="4" mx="3">
      {bgColors.map((value, index) => (
        <Link key={index} to={`/`} style={{ textDecoration: 'none' }}>
          <MoodCards bg={value} />
        </Link>
      ))}
    </FlexBox>
  );
};

export default MoodBoard;
