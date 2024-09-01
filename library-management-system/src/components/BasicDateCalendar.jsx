/**
 * The `BasicDateCalendar` function renders a basic date calendar component using Material-UI's
 * x-date-pickers library with Day.js as the date adapter.
 * @returns The `BasicDateCalendar` component is being returned. It is a functional component that
 * renders a `LocalizationProvider` component from `@mui/x-date-pickers/LocalizationProvider` library
 * with `AdapterDayjs` as the `dateAdapter` prop, and within it, a `DateCalendar` component from
 * `@mui/x-date-pickers/DateCalendar` library.
 */
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
}
