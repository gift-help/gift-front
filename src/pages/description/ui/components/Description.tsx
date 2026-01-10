import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Textarea, Badge, IconButton } from '@telegram-apps/telegram-ui';

import { useDescription } from '@/hooks/useDescription';
import formInfoStore from '@/shared/store/data.store.ts';

const BackIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 18L8 12L14 6"
      stroke="currentColor"
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
    store.fetchData();
    navigate('/results');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--tg-bg-color)',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '56px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-10px',
            top: '20%',
            transform: 'translateY(-50%)',
          }}
        >
          <IconButton mode="plain" onClick={() => navigate(-1)}>
            <BackIconSvg />
          </IconButton>
        </div>
        <div
          style={{
            top: '20%',
            position: 'absolute',
            transform: 'translateY(-50%)',
          }}
        >
          <Text weight="1">{getTitle()}</Text>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '8px', width: '100%' }}>
        <Text>{getInstructions()}</Text>
      </div>

      <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
        <Textarea
          placeholder={getPlaceholder()}
          value={store.description}
          onChange={(e) => store.setDescription(e.target.value)}
          maxLength={maxLength}
          style={{
            height: '355px',
            caretColor: 'var(--tg-button-color)',
            width: '323px',
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
          <Badge type="number" mode="secondary">
            {store.description.length}/{maxLength}
          </Badge>
        </div>
      </div>

      <div
        style={{
          paddingTop: '16px',
          paddingBottom: '20px',
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
