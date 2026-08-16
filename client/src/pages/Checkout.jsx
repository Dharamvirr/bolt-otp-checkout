import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { useDebounce } from '../hooks/useDebounce';
import { OtpModal } from '../components/OtpModal';

const Checkout = () => {
    const { user, login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        shippingAddress: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [modalError, setModalError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const debouncedEmail = useDebounce(formData.email, 800);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({ ...prev, email: user.email }));
            return;
        }

        const checkEmail = async () => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (re.test(debouncedEmail)) {
                try {
                    const response = await api.post('/auth/recognize', { email: debouncedEmail });
                    if (response.data.data.exists) {
                        setShowModal(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        checkEmail();
    }, [debouncedEmail, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpSubmit = async () => {
        setModalError(null);
        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                otp: otpInput
            });
            login(response.data.data.user);
            setShowModal(false);
            setOtpInput('');
        } catch (err) {
            setModalError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/orders', {
                userId: user ? user.id : null,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                shippingAddress: formData.shippingAddress
            });
            setOrderSuccess(true);
            setFormData({ email: user ? user.email : '', phoneNumber: '', shippingAddress: '' });
        } catch (err) {
            console.error(err);
        }
    };

    if (orderSuccess) {
        return (
            <div style={{ padding: '20px', maxWidth: '500px', margin: '40px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
                <h2>Order Placed Successfully!</h2>
                <button
                    onClick={() => setOrderSuccess(false)}
                    style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                    Place Another Order
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', position: 'relative' }}>
            {user && <h2>Welcome back, {user.firstName}!</h2>}
            {!user && <h2>Checkout</h2>}

            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={!!user}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: user ? '#e9ecef' : '#fff' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Shipping Address</label>
                    <textarea
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        required
                        rows="4"
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{ padding: '12px', cursor: 'pointer', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '10px' }}
                >
                    Submit Order
                </button>
            </form>

            <OtpModal
                show={showModal}
                otpInput={otpInput}
                setOtpInput={setOtpInput}
                onSubmit={handleOtpSubmit}
                onSkip={() => setShowModal(false)}
                error={modalError}
            />
        </div>
    );
};

export default Checkout;