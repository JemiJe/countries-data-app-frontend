'use client'

import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import Link from 'next/link';
import { AvailableCountries } from '@/types/types'

const CountryListPage = () => {
  const [countries, setCountries] = useState<AvailableCountries>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries/available`);
      const data = await res.json();
      console.log(data)
      setCountries(data);
    };
    fetchCountries();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Available Countries
      </Typography>
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.countryCode}>
            <Card>
              <CardContent>
                <Typography variant="h6">{country.name}</Typography>
                <Link href={`/country-info/${country.countryCode}`}>
                  <Typography variant="body2" color="primary">
                    View Country Info
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountryListPage;
