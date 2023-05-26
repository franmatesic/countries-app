import React from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {countryQuery, endpoint} from '../lib/graphql.js';
import {request} from 'graphql-request';
import {breakpoint, Container} from '../lib/styles.js';
import Flag from 'react-world-flags';
import styled from 'styled-components';

const Breadcrumb = styled.div`
  display: flex;
  margin-bottom: 1rem;
  column-gap: 0.5rem;
  user-select: none;
  font-size: 1.125rem;
`;

const BreadcrumbItem = styled.span`
  color: ${p => p.theme.primaryDark};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${p => p.theme.primaryLight};
  }
`;

const Content = styled(Container)`
  flex-direction: column;
  padding: 1rem;

  @media (min-width: ${breakpoint}) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;

  @media (min-width: ${breakpoint}) {
    margin-top: 4.5rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${breakpoint}) {
    justify-content: start;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  height: 3rem;

  @media (min-width: ${breakpoint}) {
    width: 8rem;
  }
`;

const Value = styled.span`
  font-weight: 700;
  height: 3rem;
`;

const Languages = styled.div`
  display: flex;
  column-gap: 0.75rem;
  max-width: 28rem;
  flex-wrap: wrap;
  justify-content: end;

  @media (min-width: ${breakpoint}) {
    justify-content: start;
  }
`;

const FlagWrapper = styled(Flag)`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  max-width: 12rem;
  border: 1px solid ${p => p.theme.neutral['300']};

  @media (min-width: ${breakpoint}) {
    max-width: 20rem;
  }
`;

export async function countryLoader({params}) {
    const data = await request(endpoint, countryQuery, {countryCode: params.countryCode});
    return data.country;
}

export default function Country() {
    const navigate = useNavigate();
    const country = useLoaderData();

    return (
        <Content>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem onClick={() => navigate(`/${country.continent.code}`)}>
                        {country.continent.name}
                    </BreadcrumbItem>
                    ❯
                    <BreadcrumbItem>
                        {country.name}
                    </BreadcrumbItem>
                </Breadcrumb>

                <FlagWrapper code={country.code} title={country.name}/>
            </div>

            <Info>
                <InfoRow>
                    <Label>Name</Label>
                    <Value>{country.name}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Capital</Label>
                    <Value>{country.capital}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Currency</Label>
                    <Value>{country.currency}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Phone</Label>
                    <Value>{country.phone}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>{country.languages.length > 1 ? 'Languages' : 'Language'}</Label>
                    <Languages>
                        {country.languages.map((language, i) =>
                            <Value key={i.toString()}>{language.name}</Value>
                        )}
                    </Languages>
                </InfoRow>
            </Info>
        </Content>
    );
}
