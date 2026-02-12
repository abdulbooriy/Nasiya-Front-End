import type { BoxProps } from '@mui/material/Box';
import type { Props as ApexChartProps } from 'react-apexcharts';

import ApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { chartClasses } from './classes';
import type { ChartProps } from './types';

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  className,
  width = '100%',
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir="ltr"
      className={chartClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 0,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      {type && series && options && (
        <ApexChart
          type={type}
          series={series as ApexChartProps['series']}
          options={options as NonNullable<ApexChartProps['options']>}
          width="100%" 
          height="100%" 
        />
      )}
    </Box>
  );
}
