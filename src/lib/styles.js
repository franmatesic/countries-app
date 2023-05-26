import styled from 'styled-components';

export const theme = {
    primaryLight: '#22c55e',
    primary: '#16a34a',
    primaryDark: '#15803d',
    neutral: {
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717'
    }
};

export const breakpoint = '64rem';

export const Container = styled.div`
  max-width: ${breakpoint};
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
