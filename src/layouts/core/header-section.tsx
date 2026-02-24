import type { RootState } from "@/store";
import type { Breakpoint } from "@mui/material/styles";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ToolbarProps } from "@mui/material/Toolbar";
import type { ContainerProps } from "@mui/material/Container";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { ListItem, ListItemButton } from "@mui/material";

import { usePathname } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { bgBlur, varAlpha } from "@/theme/styles";

import { layoutClasses } from "@/layouts/classes";
import { navData } from "@/layouts/config-nav-dashboard";

// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery: Breakpoint;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    toolbar?: ToolbarProps;
    container?: ContainerProps;
  };
};

type DataType = {
  path: string;
  title: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function HeaderSection({
  sx,
  slots,
  slotProps,
  layoutQuery = "md",
  ...other
}: HeaderSectionProps) {
  const theme = useTheme();
  const { profile } = useTypedSelector((state) => state.auth);
  const roleNavItems = profile?.role ? navData[profile?.role] : [];
  const toolbarStyles = {
    default: {
      ...bgBlur({
        color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8),
      }),
      minHeight: "auto",
      height: "var(--layout-header-mobile-height)",
      transition: theme.transitions.create(["height", "background-color"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up("sm")]: {
        minHeight: "auto",
      },
      [theme.breakpoints.up(layoutQuery)]: {
        height: "var(--layout-header-desktop-height)",
      },
    },
  };

  const pathname = usePathname();
  return (
    <AppBar
      position="sticky"
      color="transparent"
      className={layoutClasses.header}
      sx={{
        boxShadow: "none",
        zIndex: "var(--layout-header-zIndex)",
        ...(sx ?? {}),
      }}
      {...other}>
      {slots?.topArea}

      <Toolbar
        disableGutters
        {...slotProps?.toolbar}
        sx={{
          ...toolbarStyles?.default,
          ...(slotProps?.toolbar?.sx ?? {}),
        }}>
        <Container
          {...slotProps?.container}
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...(slotProps?.container?.sx ?? {}),
<<<<<<< HEAD

            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "saturate(200%) blur(30px)",
            borderBottom: "0.5px solid rgba(0, 0, 0, 0.08)",
          }}
        >
=======
          }}>
>>>>>>> 5693928f9628cdceeb2056de3e0340a952819e62
          {slots?.leftArea}

          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
<<<<<<< HEAD
              gap: "0.5rem",
              p: "4px",
              maxWidth: "1000px",
              borderRadius: "10px",
              bgcolor: "var(--layout-nav-item-hover-bg)",
              // mr: "200px",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flex: "1 auto",

                bgcolor: "var(--layout-nav-item-hover-bg)",
                borderRadius: "10px",
              }}
            >
=======
            }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, flex: "1 auto" }}>
>>>>>>> 5693928f9628cdceeb2056de3e0340a952819e62
              {roleNavItems.map((item: DataType) => {
                const isActived = item.path === pathname;

                return (
                  <ListItem disableGutters disablePadding key={item.title}>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      sx={{
                        px: 2,
                        py: "6px",
                        gap: "0.5rem",
                        borderRadius: "10px",
                        // typography: "body2",
                        fontWeight: "700",
                        fontSize: "12px",
                        color: "var(--layout-nav-item-color)",
                        minHeight: "var(--layout-nav-item-height)",
                        bgcolor: "var(--layout-nav-item-hover-bg)",
                        "&:hover": {
                          color: "var(--layout-nav-item-hover-color)",
                          bgcolor: "var(--layout-nav-item-hover-bg)",
                          transition:"all 0.2s ease"
                        },
                        ...(isActived && {
                          borderRadius: "10px",
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
                        }),
<<<<<<< HEAD
                      }}
                    >
                      <Box component="span" sx={{ width: 20, height: 20 }}>
=======
                      }}>
                      <Box component="span" sx={{ width: 24, height: 24 }}>
>>>>>>> 5693928f9628cdceeb2056de3e0340a952819e62
                        {item.icon}
                      </Box>

                      <Box component="span" flexGrow={1}>
                        {item.title}
                      </Box>

                      {item.info && item.info}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Box>
            {slots?.centerArea}
          </Box>

          {slots?.rightArea}
        </Container>
      </Toolbar>

      {slots?.bottomArea}
    </AppBar>
  );
}
