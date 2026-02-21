import type { CardProps } from "@mui/material/Card";
import type { ChartOptions } from "@/components/chart"

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";

import { fNumber } from "@/utils/format-number"
import { Chart, useChart, ChartLegends } from "@/components/chart"
import { Typography } from "@mui/material";


type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsCurrentVisits({
  title,
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item) => item.value);

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.secondary.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName} $` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart.options,
  });

  return (
    <Card
      {...other}
      sx={{
        height: "100%",
        p: "1.5rem",
        bgcolor: "#ffffff",
        borderRadius: "18px",
        boxShadow: `
      0 1px 2px rgba(0, 0, 0, 0.02),
      0 4px 14px rgba(0, 0, 0, 0.03),
      0 15px 35px rgba(0, 0, 0, 0.05)
    `,
        border: "0.5px solid rgba(0, 0, 0, 0.08)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* <CardHeader title={title} subheader={subheader} /> */}
    <Typography sx={{textTransform:"uppercase", fontWeight:"fontWeightBold",fontSize:"1.25rem",lineHeight:"1rem",color:"var(--palette-grey-800)"}}>{title}</Typography>
      
      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width={{ xs: 240, xl: 260 }}
        height={{ xs: 240, xl: 260 }}
        sx={{ my: 6, mx: "auto" }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        {...(chartOptions?.labels && { labels: chartOptions.labels })}
        {...(chartOptions?.colors && { colors: chartOptions.colors })}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
}
