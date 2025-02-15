// components/BorderCountries.tsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import { CountryInfo } from '@/types/types';

const BorderCountries = ({ countries }: { countries: CountryInfo['borders'] }) => {
  return (
    <List>
      {countries.map((border) => (
        <ListItem key={border.countryCode}>
            <ListItemText sx={{ '&:hover': { textDecoration: 'underline' } }}>
                <Link href={`/country-info/${border.countryCode}`}>{border.commonName}</Link>
            </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default BorderCountries;
