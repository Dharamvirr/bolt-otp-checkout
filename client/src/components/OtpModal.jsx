export const OtpModal = ({ show, otpInput, setOtpInput, onSubmit, onSkip, error }) => {
    if (!show) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3>Welcome Back!</h3>
                <p>We recognized your email. Enter your 6-digit code to log in.</p>
                {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
                <input
                    type="text"
                    maxLength="6"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '4px' }}
                />
                <button
                    onClick={onSubmit}
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                    Login
                </button>
                <button
                    onClick={onSkip}
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                    Skip
                </button>
            </div>
        </div>
    );
};
