'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { CountryInfo, CountryPopulation, CountryPopulationData, CountryFlag } from '@/types/types';
import BorderCountries from '@/components/BorderCountries';
import PopulationChart from '@/components/PopulationChart';
import Image from 'next/image';

const CountryInfoPage = ({ params }: { params: Promise<{ countryCode: string }> }) => {
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setCountryCode(resolvedParams.countryCode);
    });
  }, [params]);

  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [flag, setFlag] = useState<CountryFlag['data'][number] | null | undefined>(null);
  const [populationData, setPopulationData] = useState<CountryPopulationData | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryCode) return;

    const fetchData = async () => {
      try {
        const countryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries/info/${countryCode}`);
        const countryData = await countryRes.json();
        setCountryInfo(countryData);

        const populationRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries/population`);
        const populationData: CountryPopulation = await populationRes.json();
        // russia is missing on DATE_NAGER
        const countryPopulation = populationData.data.find( ({ country }) => country === countryData.commonName || country.includes(countryData.commonName))
        setPopulationData(countryPopulation);

        const flagsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries/flags`);
        const flagsData: CountryFlag = await flagsRes.json();
        const countryFlag = flagsData.data.find(({ name }) => name === countryData.commonName);
        setFlag(countryFlag);
      } catch (err) {
        setError('Failed to fetch country information.');
        console.error(err);
      }
    };

    fetchData();
  }, [countryCode]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!countryInfo) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h3">{countryInfo.commonName}</Typography>
      <Box display="flex" alignItems="center">
        {flag && flag.flag && <Image src={flag.flag} alt="Country Flag" width={100} height={50} />}
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
          {countryInfo.officialName} ({countryInfo.countryCode})
        </Typography>
      </Box>

      <Paper sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5">Region: {countryInfo.region}</Typography>
        <Typography variant="h6">Borders:</Typography>
        <BorderCountries countries={countryInfo.borders}></BorderCountries>
      </Paper>

      <Paper sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5">Population Over Time</Typography>
        {populationData && populationData !== null ? <PopulationChart populationDataArray={populationData} /> : <Typography>Loading...</Typography>}
      </Paper>
    </Box>
  );
};

export default CountryInfoPage;
