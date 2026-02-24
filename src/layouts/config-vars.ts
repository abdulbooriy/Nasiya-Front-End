import type { Theme } from '@mui/material/styles';

import { varAlpha } from '@/theme/styles'

// ----------------------------------------------------------------------

export const baseVars = (theme: Theme) => ({
  // nav
  // Our version: background.paper is dark-mode-aware; common.white is always white
  '--layout-nav-bg': theme.vars.palette.background.paper,
  '--layout-nav-border-color': varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
  '--layout-nav-zIndex': 1101,
  '--layout-nav-mobile-width': '320px',
  // nav item
  "--layout-nav-item-height": "18px",
  "--layout-nav-item-color": "rgb(142 142 147 / var(--tw-text-opacity, 1))",
  "--layout-nav-item-active-color": "#007AFF",
  // '--layout-nav-item-active-bg': varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
  "--layout-nav-item-active-bg": "#FFFFFF",
  "--layout-nav-item-hover-bg": "#F2F2F7",
  "--layout-nav-item-hover-color": "#4C4F53",
  // header
  "--layout-header-blur": "8px",
  "--layout-header-zIndex": 1100,
  "--layout-header-mobile-height": "64px",
  "--layout-header-desktop-height": "60px",
});
