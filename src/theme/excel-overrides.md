# Excel-Style UI/UX Changes

## ✅ Completed Changes

### 1. Table Styling
- **Cell borders**: 1px solid #D4D4D4 (Excel gray)
- **Header background**: #F2F2F2 (Excel header gray)
- **Sticky headers**: Position sticky with shadow
- **Font**: Arial, 13px (Excel default)

### 2. Row Effects
- **Zebra striping**: White (#FFFFFF) and light gray (#FAFAFA)
- **Hover effect**: Excel blue (#E7F4FF)
- **Selected rows**: Excel selection blue (#CCE4F7)

### 3. Status Badges
- **PAID/completed**: Green background (#C6EFCE), dark green text (#006100)
- **PENDING**: Yellow background (#FFEB9C), dark yellow text (#9C6500)
- **REJECTED/cancelled**: Red background (#FFC7CE), dark red text (#9C0006)
- **UNDERPAID**: Yellow (warning)
- **OVERPAID/active**: Blue background (#D9E1F2), dark blue text (#002060)

### 4. Cards & Papers
- **No shadows**: boxShadow: 'none'
- **Flat borders**: 1px solid #D4D4D4
- **No border radius**: borderRadius: 0

## 📝 Files Modified

1. `web/src/theme/excel-theme.ts` - Excel color palette & config
2. `web/src/theme/core/components.tsx` - MUI component overrides
3. `web/src/components/table/Table.tsx` - Table borders
4. `web/src/components/table/TableComponent.tsx` - Table container
5. `web/src/components/table/GnericTable.tsx` - Card styling
6. `web/src/components/payment-schedule/StatusBadge.tsx` - Excel colors
7. `web/src/components/excel-status-badge/` - New Excel badge component

## 🎨 Excel Color Palette

```typescript
green: '#C6EFCE'      // Success states
greenText: '#006100'
red: '#FFC7CE'        // Error states
redText: '#9C0006'
yellow: '#FFEB9C'     // Warning states
yellowText: '#9C6500'
blue: '#D9E1F2'       // Info states
blueText: '#002060'
lightGray: '#F2F2F2'  // Headers
darkGray: '#A6A6A6'   // Borders
gridColor: '#D4D4D4'  // Cell borders
```

## 🚀 Testing

Open: http://localhost:5174/
- Check tables in all pages (Mijozlar, Shartnomalar, Qarzdorlar, Kassa)
- Hover over rows to see Excel blue effect
- Check status badges colors
