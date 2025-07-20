import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginDebug = () => {
  const [email, setEmail] = useState('admin@jayambeconstructions.com');
  const [password, setPassword] = useState('admin123');
  const [result, setResult] = useState(null);

  const testLogin = async () => {
    try {
      console.log('Testing login with:', { email, password });
      
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      console.log('Response:', response);
      setResult(response.data);
      toast.success('Login test successful!');
    } catch (error) {
      console.error('Login test error:', error);
      setResult(error.response?.data || error.message);
      toast.error('Login test failed!');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Login Debug</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <button
          onClick={testLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Test Login
        </button>
        
        {result && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Result:</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginDebug; 