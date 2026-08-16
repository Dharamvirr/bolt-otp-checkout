export const RegistrationForm = ({ formData, handleChange, handleSubmit, error }) => {
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ padding: '12px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '10px' }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};