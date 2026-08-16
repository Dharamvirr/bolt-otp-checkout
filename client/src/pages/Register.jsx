import { useState } from 'react';
import api from '../utils/api';
import { RegistrationForm } from '../components/RegistrationForm';
import { OtpSuccessDisplay } from '../components/OtpSuccessDisplay';

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
    const [otp, setOtp] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const response = await api.post('/auth/register', formData);
            setOtp(response.data.data.otp);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    if (otp) {
        return <OtpSuccessDisplay otp={otp} />;
    }

    return (
        <RegistrationForm 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            error={error} 
        />
    );
};

export default Register;