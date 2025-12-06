export const CustomProgress = ({ value }: { value: number }) => {
  return (
    <div
      style={{
        width: '200px',
        height: '6px',
        backgroundColor: '#4378FF1A',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${value * 100}%`,
          height: '100%',
          backgroundColor: '#007AFF',
          borderRadius: '3px',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};
