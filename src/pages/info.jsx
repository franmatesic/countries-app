import React from 'react';
import {breakpoint, Container} from '../lib/styles.js';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  gap: 2rem;
  padding: 1.5rem 1.5rem 8rem;
  font-size: 1rem;
  line-height: 1.25rem;
  width: 100%;

  @media (min-width: ${breakpoint}) {
    font-size: 1.25rem;
    line-height: 1.875rem;
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: ${breakpoint}) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const TitleLink = styled.a`
  font-size: 1.5rem;
  color: ${p => p.theme.primaryDark};
  font-weight: 600;
  text-decoration: none;

  @media (min-width: ${breakpoint}) {
    font-size: 2.25rem;
  }
`;

const Paragraph = styled.div`
  text-align: justify;
`;

const NumberedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 1rem;
  list-style-type: decimal;
`;

const ExternalLink = styled.a`
  color: ${p => p.theme.primaryDark};
  font-weight: 600;
  padding: 0 0.33rem;
  text-decoration: none;
`;

const Code = styled.span`
  padding: 0 0.33rem;
  background-color: ${p => p.theme.neutral['200']};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;

  @media (min-width: ${breakpoint}) {
    font-size: 1.125rem;
  }
`;

export default function Info() {
    return (
        <Container>
            <Content>
                <Banner>
                    <img src="https://raw.githubusercontent.com/trevorblades/countries/main/logo.png" alt="globe" width="150"/>
                    <TitleLink href="https://github.com/trevorblades/countries" target="_blank">Countries GraphQL API</TitleLink>
                </Banner>

                <Paragraph>
                    A public GraphQL API for information about countries, continents, and languages. This project uses
                    <ExternalLink href="https://annexare.github.io/Countries/" target="_blank">Countries List</ExternalLink>and
                    <ExternalLink href="https://www.npmjs.com/package/provinces" target="_blank">provinces</ExternalLink> as
                    data sources, so the schema follows the shape of that data, with a few exceptions:
                </Paragraph>

                <NumberedList>
                    <li>
                        The codes used to key the objects in the original data are available as a code property on each item returned from the
                        API.
                    </li>
                    <li>
                        The <Code>Country.continent</Code> and <Code>Country.languages</Code> are now objects and arrays of objects, respectively.
                    </li>
                    <li>
                        The <Code>Country.currency</Code> and <Code>Country.phone</Code> fields sometimes return a comma-separated list of values. For
                        this reason, this API also exposes currencies and phones fields that are arrays of all currencies and phone codes for a
                        country.
                    </li>
                    <li>
                        Each <Code>Country</Code> has an array of <Code>states</Code> populated by their states/provinces, if any.
                    </li>
                    <li>
                        Each <Code>Country</Code> also has an <Code>awsRegion</Code> field that shows its nearest AWS region, powered by
                        <ExternalLink href="https://github.com/Zeryther/country-to-aws-region" target="_blank">country-to-aws-region</ExternalLink>.
                    </li>
                </NumberedList>
            </Content>
        </Container>
    );
}
