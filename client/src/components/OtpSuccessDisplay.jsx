import { useNavigate } from 'react-router-dom';

export const OtpSuccessDisplay = ({ otp }) => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Registration Successful!</h2>
            <p>Your one-time login code is:</p>
            <h1 style={{ letterSpacing: '8px', color: '#007bff', fontSize: '3rem' }}>{otp}</h1>
            <p><strong>Please save this code.</strong> You will need it to log in during checkout.</p>
            <button 
                onClick={() => navigate('/checkout')} 
                style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
                Go to Checkout
            </button>
        </div>
    );
};