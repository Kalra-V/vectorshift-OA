// submit.js
import { theme } from './styles/theme';

export const SubmitButton = () => {
    const buttonStyle = {
        padding: '12px 32px',
        background: theme.button.primary,
        color: theme.button.text,
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
    };
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
            <button type="submit" style={buttonStyle} onMouseEnter={(e) => {
                e.target.style.background = theme.button.primaryHover;
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            }}
                onMouseLeave={(e) => {
                    e.target.style.background = theme.button.primary;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
            >
                Submit
            </button>
        </div>
    );
}
