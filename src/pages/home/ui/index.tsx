import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Title, Text } from '@telegram-apps/telegram-ui';
import { useHome } from '@/hooks/useHome';

import formInfoStore from '@/shared/store/data.store.ts';
import giftImage from '../../../assets/gift-box.png';

export const HomePage = observer(() => {
  const navigate = useNavigate();
  const { getTitle, getSubtitle, getButtonLabel } = useHome();

  const handleStart = () => {
    formInfoStore.reset();

    navigate('/base_info', { replace: true });
  };

  return (
    <div style={styles.pageContainer}>
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shadow-pulse {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.2; transform: scale(1); }
        }
      `}
      </style>

      {/* --- HERO SECTION --- */}
      <div style={styles.heroContent}>
        <div style={styles.imageWrapper}>
          <img src={giftImage} alt="Gift Box" style={styles.giftImage} />
          <div style={styles.floorShadow}></div>
        </div>

        {/* Headlines */}
        <div style={styles.textWrapper}>
          <Title level="1" weight="1" style={{ marginBottom: '12px', width: '100%' }}>
            {getTitle()}
          </Title>

          <Text style={{ opacity: 0.6, width: '100%', margin: '0 auto', display: 'block' }}>
            {getSubtitle()}
          </Text>
        </div>
      </div>

      {/* --- ACTION SECTION --- */}
      <div>
        <Button size="l" stretched onClick={handleStart}>
          {getButtonLabel()}
        </Button>
      </div>
      {/*<div style={{ marginTop: '60px' }}>
        <BuildVersion />
      </div>*/}
    </div>
  );
});

// --- STYLES ---
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    // height: '550px',
    width: '100%',
    // padding: '20px',
    boxSizing: 'border-box' as const,
    backgroundColor: 'var(--tg-bg-color)',
  },
  heroContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    width: '100%',
  },
  imageWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '70px',
    marginTop: '80px',
  },
  giftImage: {
    width: '350px',
    height: 'auto',
    zIndex: 2,
    animation: 'float 6s ease-in-out infinite', // Requires global CSS keyframes
  },
  floorShadow: {
    position: 'absolute' as const,
    bottom: '10px',
    width: '70%',
    height: '20px',
    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
    zIndex: 1,
    transform: 'scaleY(0.5)',
    animation: 'shadow-pulse 6s ease-in-out infinite', // Requires global CSS keyframes
  },
  textWrapper: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '40px',
  },
  footer: {
    paddingTop: '30px',
    paddingBottom: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    // boxSizing: 'border-box' as const,
  },
  historyLink: {
    textAlign: 'center' as const,
    marginTop: '16px',
    cursor: 'pointer',
  },
};
