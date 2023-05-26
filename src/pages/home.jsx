import React from 'react';
import {continentQuery, endpoint} from '../lib/graphql.js';
import {request} from 'graphql-request';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {breakpoint, Container} from '../lib/styles.js';
import Flag from 'react-world-flags';
import useWindowDimensions from '../lib/useWindowDimensions.js';
import styled from 'styled-components';

const ContentColumn = styled(Container)`
  flex-direction: column;
  padding-bottom: 8rem;
`;

const Accordion = styled.div`
  display: flex;
  flex-direction: column;


  @media (min-width: ${breakpoint}) {
    flex-direction: row;
    height: 3.5rem;
  }
`;

const AccordionHeader = styled.div`
  position: ${p => p.$active ? 'sticky' : 'static'};
  top: 4rem;
  padding: 1rem;
  border-bottom: ${p => p.$active ? '0' : '1px'} solid ${p => p.theme.neutral['200']};
  background-color: ${p => p.$active ? p.theme.primary : p.theme.neutral['100']};
  color: ${p => p.$active ? p.theme.neutral['200'] : p.theme.neutral['900']};
  font-weight: ${p => p.$active ? 600 : 400};
  transition-property: background-color, color;
  transition-duration: 200ms;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.$active ? p.theme.primary : p.theme.neutral['200']};
  }

  @media (min-width: ${breakpoint}) {
    flex-basis: 25%;
    max-height: 3.5rem;
    border-left: 1px solid ${p => p.theme.neutral['200']};
  }
`;

const AccordionContent = styled.div`
  border-left: 1px solid ${p => p.theme.neutral['200']};
  border-right: 1px solid ${p => p.theme.neutral['200']};
  max-height: ${p => p.$active ? '256rem' : '0'};
  overflow: ${p => p.$active ? 'visible' : 'hidden'};
  transition-property: max-height;
  transition-duration: 400ms;

  @media (min-width: ${breakpoint}) {
    flex-basis: 75%;
    border-left: none;
    border-right: none;
    transition-duration: 0ms;
    z-index: 10;
  }
`;

const AccordionListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-bottom: 1px solid ${p => p.theme.neutral['200']};
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.neutral['100']};
  }

  @media (min-width: ${breakpoint}) {
    border-left: 1px solid ${p => p.theme.neutral['200']};
    border-right: 1px solid ${p => p.theme.neutral['200']};
  }
`;

const Label = styled.span`
  user-select: none;
`;

const FlagWrapper = styled(Flag)`
  width: 2rem;
  border: 1px solid ${p => p.theme.neutral['300']};
`;

let homeLoaderCache = [];

export async function homeLoader({params}) {
    if (homeLoaderCache.length === 0) {
        const data = await request(endpoint, continentQuery);
        homeLoaderCache = data.continents;
    }
    return {
        activeContinent: params.continentCode,
        continents: homeLoaderCache
    };
}

export default function Home() {
    const navigate = useNavigate();
    const {activeContinent, continents} = useLoaderData();
    const {width} = useWindowDimensions();

    const openPreview = (continent, country) => {
        return navigate(`/${continent.code}/${country.code}`);
    };

    const isActive = index => activeContinent === continents[index].code;

    const handleContinentClick = index => {
        if (isActive(index)) {
            navigate('/');
            return;
        }
        navigate(`/${continents[index].code}`);
    };

    return (
        <ContentColumn>
            {continents.map((continent, i) =>
                <Accordion key={`continent_${i}`}>

                    <AccordionHeader $active={isActive(i)} onClick={() => handleContinentClick(i)}>
                        <Label>{continent.name}</Label>
                    </AccordionHeader>

                    <AccordionContent $active={isActive(i)} style={{marginTop: `-${width < 1024 ? 0 : i * 3.5}rem`}}>
                        {continent.countries.map((country, j) =>
                            <AccordionListItem key={`country_${i}_${j}`} onClick={() => openPreview(continent, country)}>
                                <FlagWrapper code={country.code} title={country.name}/>
                                <Label>{country.name}</Label>
                            </AccordionListItem>
                        )}
                    </AccordionContent>
                </Accordion>
            )}
        </ContentColumn>
    );
}
