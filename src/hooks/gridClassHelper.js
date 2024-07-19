export function getGridClass(idx) {
  switch (true) {
      case (idx >= 0 && idx <= 11): // Forwards
          return 'grid-third';
      case (idx >= 12 && idx <= 19): // All defenseman and Goalies
          return 'grid-half';
      case (idx >= 20 && idx <= 22): // PP 1 Forwards
          return 'grid-third';
      case (idx >= 23 && idx <= 24): // PP 1 Defenseman
          return 'grid-half';
      case (idx >= 25 && idx <= 27): // PP 2 Forwards
          return 'grid-third';
      case (idx > 27): // PP 2 Defenseman and all PK lines
          return 'grid-half';
      default:
          return '';
  }
}