const colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f', '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

export const options = {
  sankey: {
    link: {
      colorMode: 'gradient',
      colors
    },
    node: {
      nodePadding: 80,
      colors,
      width: 8,
      labelPadding: 30,
      label: {
        fontName: 'Poppins',
        fontSize: 14,
        color: '#000000',
        bold: true,
        italic: true
      }
    },
    tooltip: { isHtml: true },
  },
};