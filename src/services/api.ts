import { RegistrationFormData, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function registerParticipant(
  courseId: string,
  formData: RegistrationFormData
): Promise<ApiResponse> {
  const url = `${API_BASE_URL}/api/register`;
  
  const payload = {
    courseId,
    ...formData,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Registration failed. Please check your inputs.',
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Registration API Error:', error);
    return {
      success: false,
      message: 'The registration server is temporarily unavailable. Please try again later.',
    };
  }
}

export async function verifyEmailToken(token: string): Promise<ApiResponse> {
  const url = `${API_BASE_URL}/api/verify?token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Verification failed or link expired.',
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Verification API Error:', error);
    return {
      success: false,
      message: 'Unable to contact the verification server. Please check your internet connection.',
    };
  }
}

export async function resendVerificationEmail(
  email: string,
  courseId: string
): Promise<ApiResponse> {
  const url = `${API_BASE_URL}/api/resend-verification`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, courseId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to resend verification email.',
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Resend verification API Error:', error);
    return {
      success: false,
      message: 'Failed to request verification email. Please try again.',
    };
  }
}
