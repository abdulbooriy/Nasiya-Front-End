import type { RootState } from "@/store";
import type { SelectChangeEvent } from "@mui/material";
import type { ChartOptions } from "@/components/chart";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";
import { useTheme, alpha as hexAlpha } from "@mui/material/styles";

import { useAppDispatch } from "@/hooks/useAppDispatch";

import { setGranularity } from "@/store/slices/dashboardSlice";
import { getStatistic } from "@/store/actions/dashboardActions";

import { Chart, useChart } from "@/components/chart";

import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";


type ChartType = {
  colors?: string[];
  categories?: string[];
  series: {
    name: string;
    data: number[];
  }[];
  options?: ChartOptions;
};

export function AnalyticsWebsiteVisits() {
  const dispatch = useAppDispatch();
  const { statistic, selectedGranularity } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const [localGranularity, setLocalGranularity] = useState(selectedGranularity);

  const selectedStatistic = statistic[localGranularity];

  useEffect(() => {
    if (!selectedStatistic) {
      dispatch(getStatistic(localGranularity));
    }
  }, [dispatch, localGranularity, selectedStatistic]);

  const handleGranularityChange = (event: SelectChangeEvent) => {
    const value = event.target.value as "daily" | "monthly" | "yearly";
    setLocalGranularity(value);
    dispatch(setGranularity(value));
  };
  const chart: ChartType = {
    categories: selectedStatistic?.categories || [],
    series: [
      {
        name: "To'lov",
        data:
          selectedStatistic?.series?.map((num: number) =>
            Number(num.toFixed(2)),
          ) || [],
      },
    ],
  };

  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    hexAlpha(theme.palette.primary.light, 0.64),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chart.categories,
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} $`,
      },
    },
    ...chart.options,
  });

  return (
    <Card
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              fontWeight: "900",
              textTransform: "uppercase",
              color: "var(--layout-nav-item-color)",
            }}
          >
            Oylik tranzaksiyalar
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              mt: "0.25rem",
              color: "black",
            }}
          >
            To'lovlar dinamikasi (Oxirgi {localGranularity === "daily" ? "30 kun" : localGranularity === "monthly" ? "12 oy" : "5 yil"})
          </Typography>
        </Box>
        {/* <FormControl
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            background: "rgba(255,255,255,0.7)",

            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",

            border: "0.5px solid rgba(0,0,0,0.08)",

            boxShadow: `
        0 1px 2px rgba(0,0,0,0.02),
        0 4px 14px rgba(0,0,0,0.03)
      `,

            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",

            "& fieldset": {
              border: "none",
            },

            "&:hover": {
              background: "rgba(255,255,255,0.9)",

              boxShadow: `
          0 4px 12px rgba(0,0,0,0.05),
          0 12px 28px rgba(0,0,0,0.06)
        `,
            },

            "&.Mui-focused": {
              background: "#fff",

              boxShadow: `
          0 0 0 3px rgba(0,122,255,0.15),
          0 8px 24px rgba(0,0,0,0.06)
        `,
            },
          },

          "& .MuiSelect-select": {
            padding: "14px 16px",
            fontWeight: 500,
          },
        }}
      >
        <Select
          value={localGranularity}
          onChange={handleGranularityChange}
          displayEmpty
        >
          <MenuItem value="daily">Kunlik</MenuItem>
          <MenuItem value="monthly">Oylik</MenuItem>
          <MenuItem value="yearly">Yillik</MenuItem>
        </Select>
      </FormControl> */}
        <Box
          sx={{
            background: "rgba(0,0,0,0.04)", // iOS light background
            borderRadius: "14px",
            padding: "4px",
            display: "inline-flex",
          }}
        >
          <ToggleButtonGroup
            value={localGranularity}
            exclusive
            onChange={(e, value) => value && setLocalGranularity(value)}
            sx={{
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "10px",
                padding: "6px 16px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "18px",
                color: "rgba(0,0,0,0.45)", // inactive text color

                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",

                "&:hover": {
                  color: "#000", // hover color same as active
                },

                "&.Mui-selected": {
                  fontWeight: "fontWeightSemiBold",
                  bgcolor: "var(--layout-nav-item-active-bg)",
                  color: "var(--layout-nav-item-active-color)",

                  boxShadow:
                    "0 3px 8px rgba(0, 0, 0, 0.1), 0 3px 1px rgba(0, 0, 0, 0.04)",

                  border: "0.5px solid rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",

                  "&:hover": {
                    color: "var(--layout-nav-item-active-color)",
                    bgcolor: "var(--layout-nav-item-active-bg)",
                  },
                },
              },
            }}
          >
            <ToggleButton value="daily">Kunlik</ToggleButton>
            <ToggleButton value="monthly">Oylik</ToggleButton>
            <ToggleButton value="yearly">Yillik</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      {selectedStatistic && chart.categories && chart.categories.length > 0 ? (
        <Chart
          type="bar"
          series={chart.series}
          options={chartOptions}
          height={364}
          // sx={{ py: 2.5, pl: 1, pr: 2.5 }}
        />
      ) : (
        <div
          style={{
            height: 364,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Ma&apos;lumotlar yuklanmoqda...
        </div>
      )}
    </Card>
  );
}
