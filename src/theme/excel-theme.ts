// Excel-like theme configuration for tables
export const excelTheme = {
  table: {
    // Excel ranglar - aniqroq va yorqinroq
    headerBackground: '#217346', // Excel yashil header
    headerTextColor: '#FFFFFF', // Oq text
    headerBorder: '#1A5C37', // To'q yashil chegara
    cellBorder: '#D0D0D0', // Excel cell border (biroz ochroq)
    rowHoverBackground: '#D3E4CD', // Excel yashil hover
    rowSelectedBackground: '#A8D08D', // Excel yashil selected
    evenRowBackground: '#FFFFFF', // Oq fon
    oddRowBackground: '#F9F9F9', // Juda och kulrang (Excel default)
    
    // Text colors
    cellTextColor: '#000000',
    
    // Border styles
    borderStyle: '1px solid #D0D0D0',
    headerBorderStyle: '1px solid #1A5C37',
    
    // Padding and spacing - KICHIKROQ (Excel kabi)
    cellPadding: '4px 8px', // Excel standart padding
    headerPadding: '6px 8px', // Header biroz kattaroq
    
    // Font
    fontFamily: 'Calibri, Arial, sans-serif', // Excel default font
    fontSize: '11px', // Excel default size
    headerFontSize: '11px',
    fontWeight: '400',
    headerFontWeight: '600',
    
    // Grid lines
    gridColor: '#D0D0D0',
    
    // Active cell (Excel-like focus)
    activeCellBorder: '2px solid #217346',
    activeCellShadow: '0 0 0 2px rgba(33, 115, 70, 0.2)',
    
    // Freeze panes effect
    stickyHeaderShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  
  // Excel color palette for status badges - ANIQROQ RANGLAR
  colors: {
    // Success - yashil (Excel conditional formatting)
    green: '#C6EFCE',
    greenText: '#006100',
    
    // Error - qizil
    red: '#FFC7CE',
    redText: '#9C0006',
    
    // Warning - sariq
    yellow: '#FFEB9C',
    yellowText: '#9C6500',
    
    // Info - ko'k
    blue: '#BDD7EE', // Excel ko'k fon
    blueText: '#1F4E78', // Excel ko'k text
    
    // Neutral
    lightGray: '#F2F2F2',
    darkGray: '#A6A6A6',
  }
};
