/* This theme file can be used to create consistent spacing, colors, and fonts across the app.
   See the `styled-system` theme documentation for more information on the format.

   For more information on how to use the theme file see: https://styled-system.com/theme-specification
*/
import { pipe } from 'ramda';

const addAlias = (alias, index) => scale => {
  scale[alias] = scale[index];
  return scale;
};

const theme = {
  colors: {
    primary: 'lightBlue',
    neutral: 'wheat',
    blue: 'DodgerBlue',
    white: 'Snow',
    0: 'rgb(102, 255, 179)',
    1: 'rgb(102, 255, 217)',
    2: 'rgb(102, 255, 255)',
    3: 'rgb(102, 217, 255)',
    4: 'rgb(102, 179, 255)',
    lightestGrey: 'hsl(0, 0%, 95%)',
    lighterGrey: 'hsl(0, 0%, 80%)',
    lightGrey: 'hsl(0, 0%, 65%)',
    grey: 'hsl(0, 0%, 50%)',
    darkGrey: 'hsl(0, 0%, 35%)',
    darkerGrey: 'hsl(0, 0%, 20%)',
    black: 'hsl(0, 0%, 10%)',
  },
  radii: {
    normal: 4,
  },
  sizes: {
    field: 32,
    page: 1280,
    0: 0,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32,
    6: 64,
    7: 128,
    8: 256,
    9: 512,
  },
  fontSizes: pipe(
    addAlias('body', 2),
    addAlias('header', 5)
  )([12, 14, 16, 20, 24, 32]),
  /*
    Uncomment this to modify the scale. The scale below is default already.
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512]

    To use the scale, provide the index of the desired value to style props on a `styled-system` component.
    e.x.:
    ```
    <Box padding={2}></Box>
    ```
    This results in 8px of padding being applied to the Box because 8 is at index 2 of the scale array.

    For more information see: https://styled-system.com/theme-specification#space
    */
};

export default theme;
