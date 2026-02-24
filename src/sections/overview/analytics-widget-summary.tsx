import type { CardProps } from "@mui/material/Card";
import type { ColorType } from "@/theme/core/palette";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import { useTheme } from "@mui/material/styles";
import { Stack, IconButton } from "@mui/material";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { formatNumber } from "@/utils/format-number";
import { setModal } from "@/store/slices/modalSlice";
// import { varAlpha, bgGradient } from "@/theme/styles";
import { Iconify } from "@/components/iconify";
import { SvgColor } from "@/components/svg-color";

type Props = CardProps & {
  title: string;
  total: number;
  currency?: number;
  color?: ColorType;
  icon: React.ReactNode;
  node?: React.ReactNode;
};

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  currency,
  color = "primary",
  sx,
  node,
  ...other
}: Props) {
  const dispatch = useAppDispatch();
  // const theme = useTheme();

  return (
    <Card
      sx={{
        minHeight: "85px",
        width: "100%",
        p: 2,

        position: "relative",

        // iOS card style
        background: "#ffffff",
        borderRadius: "18px",

        boxShadow: `
      0 1px 2px rgba(0, 0, 0, 0.02),
      0 4px 14px rgba(0, 0, 0, 0.03),
      0 15px 35px rgba(0, 0, 0, 0.05)
    `,
        border: "0.5px solid rgba(0, 0, 0, 0.08)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        color: `${color}.darker`,
<<<<<<< HEAD
        ...sx,
=======
        backgroundColor: "background.paper",
        ...sx
>>>>>>> 5693928f9628cdceeb2056de3e0340a952819e62
      }}
      {...other}
    >
      {node ? (
        <Box>
          <a
            href="https://bank.uz/currency/cb.html"
            title="Bank.uz - O'zbekiston banklari to'g'risida barcha ma'lumotlar"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://bank.uz/scripts/informer"
              alt="Dollar kursi"
              style={{
                maxWidth: "100%",
                height: "85px",
                borderRadius: 0,
              }}
            />
          </a>
        </Box>
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Box
              sx={{
                width: "34px",
                height: "34px",
                // height: { xs: 36, sm: 42, md: 48 },
                // mb: { xs: 2, sm: 2.5, md: 3 },

                borderRadius: "12px",
                backgroundColor: "#fff1f2",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                border: "1px solid rgba(0,0,0,0.02)",

                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              {icon}
            </Box>
            {currency !== undefined && currency >= 0 && (
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => {
                  dispatch(
                    setModal({
                      modal: "dashboardModal",
                      data: { type: "edit", data: currency },
                    }),
                  );
                }}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            )}
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ flexGrow: 1, minWidth: { xs: 80, sm: 100, md: 112 } }}>
              <Box
                sx={{
                  mt: "2px",
                  // typography: "subtitle2",
                  // fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  color: "var(--layout-nav-item-color)",
                  fontWeight: "700",
                  fontSize: "10px",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </Box>
              <Box
                sx={{
                  // typography: "h4",
                  // fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  color: "#000000",
                  mb: "0.125rem",
                  fontWeight: "900",
                }}
              >
                {formatNumber(total)}
              </Box>
            </Box>
          </Box>

          <SvgColor
            src=""
            sx={{
              top: 0,
              left: -20,
              width: 240,
              zIndex: -1,
              height: 240,
              opacity: 0.24,
              position: "absolute",
              color: `${color}.main`,
            }}
          />
        </>
      )}
    </Card>
  );
}
