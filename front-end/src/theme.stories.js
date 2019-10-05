import React from 'react';
import {
  mapObjIndexed,
  join,
  groupBy,
  map,
  values,
  pipe,
  toPairs,
  nth,
} from 'ramda';
import { storiesOf } from '@storybook/react';

import FlexBox from 'Components/FlexBox';
import Box from 'Components/Box';
import Text from 'Components/Text';
import theme from './theme';

storiesOf('Theme|Color', module).add(
  'Swatches',
  () => (
    <FlexBox col alignItems="center">
      <h1>COLORS</h1>
      <FlexBox flexWrap="wrap" maxWidth={800} justifyContent="center" mx="auto">
        {Object.keys(theme.colors).map(color => (
          <Box key={color} p={1}>
            <span style={{ fontVariant: 'small-caps' }}>{color}</span>
            <Box
              mt={1}
              mb={2}
              p={1}
              width={128}
              height={128}
              bg={color}
              borderRadius="normal"
              border="1px solid rgba(0,0,0,0.3)"
            />
          </Box>
        ))}
      </FlexBox>
    </FlexBox>
  ),
  {
    notes: `
# Colors
All keys under \`colors\` in \`theme.js\` will appear here for easy reference.
`,
  }
);

storiesOf('Theme|Scales', module)
  .add('Sizes', () => (
    <Box>
      {Object.keys(theme.sizes).map(key => (
        <FlexBox key={key}>
          <Box width={64}>{key}</Box>
          <FlexBox
            height={3}
            width={key}
            bg="primary"
            mb={3}
            ml={2}
            borderRadius="normal"
            alignItems="center"
          ></FlexBox>
        </FlexBox>
      ))}
    </Box>
  ))
  .add('Font sizes', () => (
    <FlexBox col>
      {pipe(
        toPairs,
        groupBy(nth(1)),
        map(map(nth(0))),
        mapObjIndexed((names, fontSize) => (
          <Text key={fontSize} fontSize={names[0]} mb={3}>
            <Text fontSize={2} color="lightGrey" mb={1}>
              {join(', ', names)}
            </Text>
            <br />
            The quick brown fox jumped over the lazy dog.
          </Text>
        )),
        values
      )(theme.fontSizes)}
    </FlexBox>
  ));
