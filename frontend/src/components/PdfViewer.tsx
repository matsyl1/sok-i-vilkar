interface PdfViewerProps {
  filename: string;
}

const PdfViewer = ({ filename }: PdfViewerProps) => {

  const pdfUrl = `/api/pdf/${filename}`;

  return (
    <iframe src={pdfUrl} width='100%' height='600px'/>
  );
};

export default PdfViewer;
