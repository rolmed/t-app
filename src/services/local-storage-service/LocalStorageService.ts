class LocalStorageService {
  parseJson(data: string | null) {
    try {
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
    return undefined;
  }

  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  setAuthToken(token: string) {
    localStorage.setItem('authToken', JSON.stringify(token));
  }

  getAuthToken(): string {
    const authToken = localStorage.getItem('authToken');
    return authToken ? this.parseJson(authToken) : undefined;
  }
}

export default new LocalStorageService();
