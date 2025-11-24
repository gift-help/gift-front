import React from 'react';

const BuildVersion: React.FC = () => {
  const hash = import.meta.env.VITE_COMMIT_HASH || 'DEV';
  const time = import.meta.env.VITE_BUILD_TIME || 'Local Build';

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <span style={styles.label}>Built:</span>
        <span style={styles.value}>{time} (EKB) • </span>
        <span style={styles.value}>{hash}</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 60px 0',
    fontSize: '10px',
    color: 'var(--tg-hint-color:, #6c757d)',
    fontFamily: 'monospace',
    width: '100%',
    opacity: 0.6,
    marginTop: 'auto',
  },
  row: {
    display: 'flex',
    gap: '6px',
    marginBottom: '2px',
  },
  label: {
    fontWeight: 'normal',
  },
  value: {
    fontWeight: 'bold',
  },
};

export default BuildVersion;
