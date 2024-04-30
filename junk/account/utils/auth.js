const API_URL = 'https://api.ethicalspectacle.com';

export async function authenticateUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok && data === 'success') {
        return true;
        } else {
        return false;
        }
    } catch (error) {
        console.error('Authentication failed:', error);
        return false;
    }
}


export async function createAccount(userInfo) {
    try {
      const response = await fetch(`${API_URL}/create_account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (response.ok && data === 'success') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error creating account:', error);
      return false;
    }
  }

export async function checkEmailVerification(email) {
    try {
        const response = await fetch(`${API_URL}/check_email_verification?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        return data.is_verified;
    } catch (error) {
        console.error('Error checking email verification:', error);
        return false;
    }
}

export async function sendVerificationEmail(token) {
    try {
        const response = await fetch(`${API_URL}/verify_email?token=${token}`, {
        method: 'GET',
        });
        return response.ok;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
}
  
export function storeCredentials(userEmail, isVerified) {
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('isEmailVerified', isVerified.toString());
    localStorage.setItem('isLoggedIn', 'true');
}
  
export function clearCredentials() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isEmailVerified');
    localStorage.removeItem('isLoggedIn');
}


export function handleLogout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isEmailVerified');
}

export async function handleAuthentication(email, password) {
    const { login } = useAuth();
    return authenticateUser(email, password).then(success => {
        if (success) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            login(email);  // Update the global context
            return true;
        }
        return false;
    }).catch(error => {
        console.error('Authentication error:', error);
        return false;
    });
}