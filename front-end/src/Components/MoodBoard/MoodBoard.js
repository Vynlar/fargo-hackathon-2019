import React from 'react';
import MoodCards from '../MoodCards';
import FlexBox from '../../Components/FlexBox';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import Emoji from 'emoji-dictionary';

const SUBMIT_HELP_REQUEST = gql`
  mutation SubmitHelpRequest($moodScore: Int!) {
    submitHelpRequest(healthScore: $moodScore) {
      id
    }
  }
`;

const MoodBoard = () => {
  const bgColors = [0, 1, 2, 3, 4];
  const emojis = [14, 15, 41, 58, 73];

  return (
    <FlexBox flexDirection="column" alignItems="center" mb="4" mx="3">
      {bgColors.map((value, index) => (
        <Mutation mutation={SUBMIT_HELP_REQUEST} key={index}>
          {(submit, { loading, error, data }) => {
            if (loading) return 'Loading';
            if (error) return 'Error';
            if (data)
              return <Redirect to={`/chat/${data.submitHelpRequest.id}`} />;
            return (
              <a
                onClick={() => {
                  submit({ variables: { moodScore: index } });
                }}
                style={{ textDecoration: 'none' }}
              >
                <MoodCards bg={value} emoji={Emoji.unicode[emojis[index]]} />
              </a>
            );
          }}
        </Mutation>
      ))}
    </FlexBox>
  );
};

export default MoodBoard;
