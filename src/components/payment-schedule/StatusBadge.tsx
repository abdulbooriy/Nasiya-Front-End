import { Box } from "@mui/material";
import { Iconify } from "@/components/iconify";

interface StatusBadgeProps {
  status: string;
  size?: "small" | "medium";
}

const STATUS_STYLES: Record<string, { bg: string; color: string; border: string; label: string; icon: string | null }> = {
  PAID:     { bg: 'rgba(var(--palette-success-mainChannel) / 0.16)', color: 'var(--palette-success-dark)',  border: 'rgba(var(--palette-success-mainChannel) / 0.4)', label: "TO'LANDI",   icon: "mdi:check-circle" },
  UNDERPAID:{ bg: 'rgba(var(--palette-warning-mainChannel) / 0.16)', color: 'var(--palette-warning-dark)',  border: 'rgba(var(--palette-warning-mainChannel) / 0.4)', label: "KAM",        icon: "mdi:alert" },
  OVERPAID: { bg: 'rgba(var(--palette-info-mainChannel)    / 0.16)', color: 'var(--palette-info-dark)',     border: 'rgba(var(--palette-info-mainChannel)    / 0.4)', label: "KO'P",       icon: "mdi:arrow-up" },
  PENDING:  { bg: 'rgba(var(--palette-warning-mainChannel) / 0.16)', color: 'var(--palette-warning-dark)',  border: 'rgba(var(--palette-warning-mainChannel) / 0.4)', label: "KUTISH",     icon: "mdi:clock-outline" },
  REJECTED: { bg: 'rgba(var(--palette-error-mainChannel)   / 0.16)', color: 'var(--palette-error-main)',    border: 'rgba(var(--palette-error-mainChannel)   / 0.4)', label: "RAD ETILDI", icon: "mdi:close-circle" },
};

const DEFAULT_STYLE = {
  bg: 'rgba(var(--palette-grey-500Channel) / 0.16)',
  color: 'var(--palette-text-secondary)',
  border: 'rgba(var(--palette-grey-500Channel) / 0.4)',
  icon: null,
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "small",
}) => {
  const key = status?.toUpperCase();
  const s = STATUS_STYLES[key] ?? { ...DEFAULT_STYLE, label: status };
  const displayLabel = (s as typeof STATUS_STYLES[string]).label ?? status;
  const icon = (s as typeof STATUS_STYLES[string]).icon ?? null;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: size === "small" ? "3px 6px" : "4px 8px",
        fontSize: size === "small" ? "10px" : "11px",
        fontWeight: 600,
        fontFamily: "Calibri, Arial, sans-serif",
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 0,
      }}
    >
      {icon && (
        <Iconify
          icon={icon}
          width={size === "small" ? 12 : 14}
        />
      )}
      {displayLabel}
    </Box>
  );
};
