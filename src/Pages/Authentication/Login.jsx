import { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from 'react-icons/fa';
import { RiShieldUserFill } from 'react-icons/ri';
import { SiGmail } from 'react-icons/si';
import { NavLink, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
export default function Login() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://pos-backend-delta.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${data?.message || 'Login successful!'}`);
        console.log('Response:', data);
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user info in local storage
        navigate('/dashboard'); // Redirect to a dashboard or home page
      } else {
        const errorData = await response.json();
        toast.error(`${errorData?.message || 'Login failed. Please try again.'}`);
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setFormData({
        email: 'manager@gmail.com',
        password: 'Manager1@',
        role: 'manager',
      });
    } else if (role === 'staff') {
      setFormData({
        email: 'staff@gmail.com',
        password: 'Staff1@',
        role: 'staff',
      });
    }
  };

  return (
    <div className="bg-register flex justify-center items-center">
      <form
        className="mx-3 lg:mx-0 p-6 rounded-lg lg:w-[400px] relative"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h2 className="text-5xl font-semibold mb-2 Register-text">Pos System</h2>
        </div>

        {/* Email Input */}
        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="flex items-center bg-white rounded-3xl p-2">
            <SiGmail className="text-[#9494a0] mr-2" />
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Role Input */}
        <div className="mb-2">
          <label htmlFor="role" className="block text-sm font-medium">
            Login as a
          </label>
          <div className="flex items-center bg-white rounded-3xl p-2">
            <RiShieldUserFill className="text-[#9494a0] mr-2" />
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full outline-none"
              required
            >
              <option value="">Select a role</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="flex items-center bg-white rounded-3xl p-2">
            <FaLock className="text-[#9494a0] mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none ml-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div><button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#fcda6c] hover:bg-[#f5e091] transition-all duration-300 font-bold py-2 px-4 rounded-3xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          Login
        </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>

        {/* Demo Login Buttons */}
        <div className="mt-4">
          <p className="text-center text-sm font-medium mb-2">Demo Login:</p>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex-1 bg-[#d1c62cea] hover:bg-[#79731dea] text-white font-medium py-2 px-4 rounded-3xl transition-all duration-300"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('staff')}
              className="flex-1 bg-[#d1c62cea] hover:bg-[#79731dea] text-white font-medium py-2 px-4 rounded-3xl transition-all duration-300"
            >
              Staff
            </button>
          </div>
        </div>


        <div className="flex justify-center mt-2">
          <small>Don&apos;t have an account?</small>
          <NavLink to="/register">
            <small className="text-blue-500 underline ml-2">Register</small>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
