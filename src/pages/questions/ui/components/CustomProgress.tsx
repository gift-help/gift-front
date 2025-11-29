export const CustomProgress = ({ value }: { value: number }) => {
    return (
        <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--tgui--secondary_bg_color, #f2f2f2)',
            borderRadius: '3px',
            overflow: 'hidden'
        }}>
            <div
                style={{
                    width: `${value * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--tgui--button_color, #2481cc)',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease'
                }}
            />
        </div>
    );
};