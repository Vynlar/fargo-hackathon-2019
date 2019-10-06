import React from 'react';
import MoodCards from '../MoodCards';
import FlexBox from '../../Components/FlexBox';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import Emoji from 'emoji-dictionary';

const SUBMIT_HELP_REQUEST = gql`
  mutation SubmitHelpRequest($moodScore: Int!, $helpRequestId: ID) {
    closeConversation(helpRequestId: $helpRequestId)
    submitHelpRequest(healthScore: $moodScore) {
      id
    }
  }
`;

const GET_CURRENT_CONVERSATION = gql`
  query CurrentConvo {
    currentConversation {
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
        <Query query={GET_CURRENT_CONVERSATION} key={index}>
          {({ loading, error, data: currentConvoData }) => {
            return (
              <Mutation mutation={SUBMIT_HELP_REQUEST}>
                {(createHelpRequest, { loading, error, data }) => {
                  if (loading) return 'Loading';
                  if (error) return 'Error';
                  if (data) return <Redirect to="/chat" />;
                  return (
                    <a
                      onClick={() => {
                        createHelpRequest({
                          variables: {
                            moodScore: 4 - index,
                            helpRequestId: currentConvoData.currentConversation
                              ? currentConvoData.currentConversation.id
                              : null,
                          },
                        });
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      <MoodCards
                        bg={value}
                        emoji={Emoji.unicode[emojis[index]]}
                      />
                    </a>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      ))}
    </FlexBox>
  );
};

export default MoodBoard;
