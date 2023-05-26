import {gql} from 'graphql-request';

export const endpoint = 'https://countries.trevorblades.com/graphql';

export const continentQuery = gql`
    query Continents {
        continents {
            code
            name
            countries {
                code
                name
            }
        }
    }
`;

export const countryQuery = gql`
    query Country($countryCode: ID!) {
        country(code: $countryCode) {
            code
            name
            capital
            phone
            currency
            languages {
                code
                name
            }
            continent {
                code
                name
            }
        }
    }
`;
