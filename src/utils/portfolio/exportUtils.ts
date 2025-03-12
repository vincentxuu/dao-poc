import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportAsImage = async (elementId: string, fileName: string = 'business-card') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${fileName}.png`;
    link.click();
  } catch (error) {
    console.error('Error exporting as image:', error);
  }
};

export const exportAsPDF = async (elementId: string, fileName: string = 'business-card') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error exporting as PDF:', error);
  }
};

export const exportAsHTML = (elementId: string, fileName: string = 'business-card') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${fileName}</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body>
      ${element.outerHTML}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.html`;
  link.click();
  URL.revokeObjectURL(url);
};
