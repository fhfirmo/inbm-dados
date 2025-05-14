// src/app/login/page.js
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => { // Added async here
    e.preventDefault();
    // Handle login logic here
    const { data, error } = await supabase.auth.signInWithPassword({ // Added await and changed to data, error
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      // You might want to display an error message to the user here
    } else if (data && data.user) { // Check for both data and data.user
      console.log('Login successful!', data.user); // Log the user object
      // Redirect to the dashboard or another protected page
      window.location.href = '/dashboard'; // Simple client-side redirect
    } else {
      // Handle cases where there's no error but also no user in the data
      console.error('Login failed: No user returned.');
      // Display a generic login failed message
    }
  };
  return (
    <div className="container">
      <div className="login-container">
        <div className="logo-container">
          <Image
            src="https://firmoconsultoria.com.br/inbm/Inbm_02_logo.svg"
            alt="INBM Logo"
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>

        <h2>Acesse sua Conta</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Lembrar-me</label>
          </div>

          <button type="submit" className="primary-button">
            Entrar
          </button>
        </form>

        <div className="links-container">
          <Link href="/forgot-password">Esqueceu sua senha?</Link>
          <Link href="/create-account">Criar nova conta</Link>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f2f5; /* Light background */
        }

        .login-container {
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }

        .logo-container {
          margin-bottom: 20px;
        }

        h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .form-group input[type='email'],
        .form-group input[type='password'] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box; /* Include padding and border in the element's total width and height */
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .checkbox-group input[type='checkbox'] {
          margin-right: 5px;
        }

        .primary-button {
          width: 100%;
          padding: 12px;
          background-color: #0070f3; /* Example primary color */
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .primary-button:hover {
          background-color: #005bb5; /* Darker shade on hover */
        }

        .links-container {
          margin-top: 20px;
          font-size: 14px;
        }

        .links-container a {
          color: #0070f3;
          text-decoration: none;
          margin: 0 10px;
        }

        .links-container a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}