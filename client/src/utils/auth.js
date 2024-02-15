import decode from 'jwt-decode';

class AuthService {
  getProfile() {
      return decode(this.getToken());
    }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    if (!token) {
      // Assume the token is expired if it does not exist
      return true;
    }
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Handle the error as appropriate
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    //window.location.assign('/home');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
