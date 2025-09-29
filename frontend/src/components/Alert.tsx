import type { SearchResult } from '../types';

interface AlertProps {
  resMessage: SearchResult | null;
  alertMessage: string | null;
}

const Alert = ({ resMessage, alertMessage }: AlertProps) => {

  if(!resMessage && !alertMessage) {
    return null;
  }

  const documents = resMessage?.documents || [];
  const searchMatch = documents.some(document => document.count > 0);
  const documentMatch = documents.filter(document => document.count > 0).length;
  const totalSearchMatch  = documents.reduce((acc, document) => acc + (document.count > 0 ? document.count : 0), 0);

  const match = resMessage && searchMatch;
  const noMatch = resMessage && !searchMatch;
  const alert = alertMessage;

  return (
    <div style={{ display: 'inline-block', backgroundColor: 'lightyellow', padding: '0.1rem', marginTop: '1rem' }}>

      {match && (
        <div>Fant {totalSearchMatch} treff i {documentMatch} dokumenter for «{resMessage.query}»</div>
      )}

      {noMatch && (
        <div>Finner ikke noen treff på «{resMessage.query}»</div>
      )}

      {alert && (
        <div>{alertMessage}</div>
      )}

    </div>
  );
};

export default Alert;
