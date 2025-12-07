import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Textarea, Badge, IconButton } from '@telegram-apps/telegram-ui';

import { useDescription } from '@/hooks/useDescription';
import formInfoStore from '@/shared/store/store';

const CloseIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="var(--tg-button-color)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DescriptionPage = observer(() => {
  const navigate = useNavigate();
  const store = formInfoStore;
  const { getTitle, getInstructions, getPlaceholder, getButtonLabel, maxLength } = useDescription();

  const handleSubmit = () => {
    store.submitDescription();
    navigate('/results');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--tg-bg-color)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '12px 16px',
          minHeight: '56px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <IconButton mode="plain" onClick={() => navigate(-1)}>
            <CloseIconSvg />
          </IconButton>
        </div>

        <Text weight="1" style={{ fontSize: 20, fontWeight: 700 }}>
          {getTitle()}
        </Text>
      </div>

      <div style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px', padding: '0 10px' }}>
          <Text style={{ fontSize: 16, lineHeight: '1.4', fontWeight: 500 }}>
            {getInstructions()}
          </Text>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          <Textarea
            placeholder={getPlaceholder()}
            value={store.description}
            onChange={(e) => store.setDescription(e.target.value)}
            maxLength={maxLength}
            style={{
              height: '355px',
              caretColor: 'var(--tg-button-color)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '23px',
              right: '30px',
              pointerEvents: 'none',
            }}
          >
            <Badge
              type="number"
              mode="primary"
              style={{
                backgroundColor: '#E6F2FF',
                color: 'var(--tg-button-color)',
                fontSize: '13px',
                padding: '6px 10px',
              }}
            >
              {store.description.length}/{maxLength}
            </Badge>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          paddingBottom: '32px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Button onClick={handleSubmit} disabled={!store.canSubmitDescription}>
          {getButtonLabel()}
        </Button>
      </div>
    </div>
  );
});
