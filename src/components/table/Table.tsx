import React, { useState, useEffect } from "react";

import {
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { Scrollbar } from "@/components/scrollbar";
import { TableNoData } from "./TableNoData";
import {
  excelHeaderCellStyle,
  excelBodyCellStyle,
  excelRowStyle,
  excelTableContainerStyle,
  excelPaginationStyle,
  excelCheckboxStyle,
  excelStickyLeftStyle,
  excelStickyRightStyle,
  EXCEL_COLORS,
} from "./excel-table-styles";

interface Column<T = any> {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: T) => string | React.ReactNode;
  renderCell?: (row: T) => React.ReactNode;
  sticky?: "left" | "right";
  stickyOffset?: number;
}

interface TableComponentProps<T> {
  columns: Column[];
  data: T[];
  selectedColumns?: string[];
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
  onRowClick?: (row: T) => void;
  onCustomerClick?: (customer: any) => void;
  onNotesClick?: (row: T) => void;
  filterName?: string;
  noDataText?: string;
  renderActions?: (row: T) => React.ReactNode;
  selectable?: boolean;
  onSelectedRowsChange?: (selectedIds: string[]) => void;
  selectedRowss?: string[];
}

export function TableComponent<T extends Record<string, any>>({
  columns,
  data,
  selectedColumns = columns.map((col) => col.id),
  rowsPerPageOptions = [15, 50, 100, 1000],
  initialRowsPerPage = 100,
  onRowClick,
  onCustomerClick,
  onNotesClick,
  filterName = "",
  noDataText = "No data found",
  renderActions,
  selectable = false,
  onSelectedRowsChange,
  selectedRowss,
}: TableComponentProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // const [filterName] = useState("");

  // Barcha qatorlarni tanlash/olib tashlash
  const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((row) => row['_id'] || row['id']);
      setSelectedRows(newSelected);
      onSelectedRowsChange?.(newSelected);
    } else {
      setSelectedRows([]);
      onSelectedRowsChange?.([]);
    }
  };

  const handleSelectRow = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, id];
    } else {
      newSelected = selectedRows.filter((rowId) => rowId !== id);
    }

    setSelectedRows(newSelected);
    onSelectedRowsChange?.(newSelected);
  };

  useEffect(() => {
    if (selectedRowss?.length === 0) {
      setSelectedRows([]);
    }
  }, [selectedRowss]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterName.toLowerCase())
    )
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const notFound = !filteredData.length && !!filterName;
  const isEmpty = !filteredData.length && !filterName;

  const renderCellValue = (row: T, column: Column) => {
    if (column.renderCell) {
      // @ts-ignore - renderCell can accept optional second and third parameters
      return column.renderCell(row, onCustomerClick, onNotesClick);
    }

    const value = row[column.id];

    if (column.id === "manager") {
      return value || "—";
    }

    return column.format
      ? column.format(value)
      : column.id === "birthDate"
        ? value.split("T")[0]
        : value;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedRows([]);
        onSelectedRowsChange?.([]);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onSelectedRowsChange]);

  return (
    <>
      <Scrollbar>
        <TableContainer sx={excelTableContainerStyle}>
          <Table
            aria-label="sticky table"
            size="small"
            stickyHeader
            sx={{ width: "100%" }}
          >
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      ...excelHeaderCellStyle,
                      ...excelStickyLeftStyle(0),
                      zIndex: 4,
                    }}
                  >
                    <Checkbox
                      sx={{
                        ...excelCheckboxStyle,
                        color: 'rgba(255,255,255,0.7)',
                        '&.Mui-checked': { color: 'var(--palette-common-white)' },
                        '&.MuiCheckbox-indeterminate': { color: 'var(--palette-common-white)' },
                      }}
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < filteredData.length
                      }
                      checked={
                        filteredData.length > 0 &&
                        selectedRows.length === filteredData.length
                      }
                      onChange={handleSelectAllRows}
                    />
                  </TableCell>
                )}
                {columns
                  .filter((column) => selectedColumns.includes(column.id))
                  .map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{
                        ...excelHeaderCellStyle,
                        minWidth: { xs: "auto", sm: column.minWidth || column.width || 100 },
                        width: column.width ? `${column.width}px` : "auto",
                        ...(column.sticky && {
                          ...(column.sticky === "left" 
                            ? excelStickyLeftStyle(column.stickyOffset || 0)
                            : excelStickyRightStyle(column.stickyOffset || 0)
                          ),
                          zIndex: 4,
                          backgroundColor: `${EXCEL_COLORS.headerBg} !important`,
                        }),
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                {renderActions && (
                  <TableCell
                    align="right"
                    sx={excelHeaderCellStyle}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const rowId = row['_id'] || row['id'] || index.toString();
                  const isSelected = selectedRows.includes(rowId);

                  // ✅ Muddati o'tgan eslatmani tekshirish
                  const isExpiredReminder = row['isReminderNotification'] && row['date'] && new Date(row['date']) < new Date();
                  
                  return (
                    <TableRow
                      hover
                      key={rowId}
                      selected={isSelected}
                      sx={{
                        ...excelRowStyle,
                        cursor: onRowClick ? "pointer" : "default",
                        ...(row['isDeleted'] && {
                          backgroundColor: "rgba(var(--palette-error-mainChannel) / 0.1) !important",
                          "&:hover": {
                            backgroundColor: "rgba(var(--palette-error-mainChannel) / 0.2) !important",
                          },
                        }),
                        ...(isExpiredReminder && {
                          backgroundColor: "rgba(var(--palette-error-mainChannel) / 0.08) !important",
                          "&:hover": {
                            backgroundColor: "rgba(var(--palette-error-mainChannel) / 0.15) !important",
                          },
                        }),
                        ...(row['isReminderNotification'] && !isExpiredReminder && {
                          backgroundColor: "rgba(var(--palette-warning-mainChannel) / 0.08) !important",
                          "&:hover": {
                            backgroundColor: "rgba(var(--palette-warning-mainChannel) / 0.15) !important",
                          },
                        }),
                      }}
                    >
                      {selectable && (
                        <TableCell
                          padding="checkbox"
                          sx={{
                            ...excelBodyCellStyle,
                            ...excelStickyLeftStyle(0),
                            zIndex: 1,
                            ...(isExpiredReminder && {
                              backgroundColor: "rgba(var(--palette-error-mainChannel) / 0.08)",
                            }),
                            ...(row['isReminderNotification'] && !isExpiredReminder && {
                              backgroundColor: "rgba(var(--palette-warning-mainChannel) / 0.08)",
                            }),
                          }}
                        >
                          <Checkbox
                            sx={excelCheckboxStyle}
                            checked={isSelected}
                            onClick={(event) => handleSelectRow(event, rowId)}
                          />
                        </TableCell>
                      )}
                      {columns
                        .filter((column) => selectedColumns.includes(column.id))
                        .map((column) => (
                          <TableCell
                            key={`${rowId}-${column.id}`}
                            align={column.align || "left"}
                            onClick={() => onRowClick?.(row)}
                            sx={{
                              ...excelBodyCellStyle,
                              minWidth: { xs: "auto", sm: column.minWidth || column['width'] || 100 },
                              width: column['width'] ? `${column['width']}px` : "auto",
                              ...(column.sticky && {
                                ...(column.sticky === "left" 
                                  ? excelStickyLeftStyle(column.stickyOffset || 0)
                                  : excelStickyRightStyle(column.stickyOffset || 0)
                                ),
                                zIndex: 1,
                                ...(isExpiredReminder && {
                                  backgroundColor: "rgba(var(--palette-error-mainChannel) / 0.08)",
                                }),
                                ...(row['isReminderNotification'] && !isExpiredReminder && {
                                  backgroundColor: "rgba(var(--palette-warning-mainChannel) / 0.08)",
                                }),
                              }),
                            }}
                          >
                            {renderCellValue(row, column)}
                          </TableCell>
                        ))}
                      {renderActions && (
                        <TableCell
                          align="right"
                          sx={{
                            ...excelBodyCellStyle,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {renderActions(row)}
                        </TableCell>
                      )}





                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={selectedColumns.length} />
                </TableRow>
              )}

              {notFound && (
                <TableNoData
                  columns={columns.length}
                  searchQuery={filterName}
                />
              )}
              {isEmpty && (
                <TableNoData
                  columns={columns.length}
                  searchQuery={noDataText}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={excelPaginationStyle}
      />
    </>
  );
}
