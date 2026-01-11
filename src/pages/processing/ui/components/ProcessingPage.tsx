import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text } from '@telegram-apps/telegram-ui';
import { observer } from 'mobx-react-lite';
import formInfoStore from '@/shared/store/data.store';
import { useProcessing } from '@/hooks/useProcessing';

export const ProcessingPage = observer(() => {
  const navigate = useNavigate();
  const { getTitle, getStepAnalyzing, getStepSearching, getStepWrapping, getStepReady } =
    useProcessing();
  const [progress, setProgress] = useState(0);

  const statusText = useMemo(() => {
    if (progress < 30) return getStepAnalyzing();
    if (progress < 70) return getStepSearching();
    if (progress < 95) return getStepWrapping();
    return getStepReady();
  }, [progress, getStepAnalyzing, getStepSearching, getStepWrapping, getStepReady]);

  useEffect(() => {
    // Start Progress Animation
    const interval = setInterval(() => {
      setProgress((old) => {
        // Slow down significantly as we approach 90%
        if (old >= 90) return old;
        const increment = old > 70 ? 1 : 5;
        return old + increment;
      });
    }, 200);

    // Fetch Data Logic
    const processData = async () => {
      try {
        // Start the API call AND the timer simultaneously
        await Promise.all([
          formInfoStore.fetchData(),
          new Promise((resolve) => setTimeout(resolve, 2500)), // Min 2.5s wait for effect
        ]);

        setProgress(100);

        // Navigate to results
        setTimeout(() => {
          navigate('/results', { replace: true });
        }, 500);
      } catch (error) {
        console.error('Critical Error:', error);
        navigate('/base-info');
      }
    };

    processData();

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse-ring {
            0% { transform: scale(0.33); opacity: 1; }
            80%, 100% { opacity: 0; }
          }
          @keyframes pulse-dot {
            0% { transform: scale(0.8); }
            50% { transform: scale(1); }
            100% { transform: scale(0.8); }
          }
        `}
      </style>

      <div style={styles.content}>
        <div style={styles.iconWrapper}>
          <div style={styles.ring}></div>
          <div style={styles.circle}>🎁</div>
        </div>

        <Title level="2" weight="1" style={{ marginTop: 24 }}>
          {getTitle()}
        </Title>
        <Text style={{ opacity: 0.6, marginTop: 8, maxWidth: '100%', minHeight: '48px' }}>
          {statusText}
        </Text>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>

        <Text style={{ fontSize: 12, opacity: 0.4, marginTop: 8 }}>{Math.round(progress)}%</Text>
      </div>
    </div>
  );
});

// --- STYLES ---
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: 'var(--tg-bg-color)',
    textAlign: 'center' as const,
    boxSizing: 'border-box' as const,
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
  },
  iconWrapper: {
    position: 'relative' as const,
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  ring: {
    position: 'absolute' as const,
    width: '80px',
    height: '80px',
    border: '4px solid var(--tgui--button_color, #2481cc)',
    borderRadius: '50%',
    animation: 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
  },
  circle: {
    position: 'relative' as const,
    fontSize: '40px',
    zIndex: 2,
    animation: 'pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
  },
  progressContainer: {
    width: '100%',
    maxWidth: '280px',
    height: '6px',
    backgroundColor: 'var(--tgui--secondary_bg_color, #f2f2f2)',
    borderRadius: '10px',
    marginTop: '30px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'var(--tgui--button_color, #2481cc)',
    transition: 'width 0.3s ease-out',
    borderRadius: '10px',
  },
};
