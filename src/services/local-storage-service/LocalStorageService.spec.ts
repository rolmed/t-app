import LocalStorageService from './LocalStorageService';

describe('LocalStorageService', () => {
  beforeEach(() => localStorage.clear());

  describe('parseJson', () => {
    it('should return parsed json', () => {
      const value = '{"test": "abc"}';
      const result = LocalStorageService.parseJson(value);

      expect(result).toEqual({ test: 'abc' });
    });

    it('should return undefined if value is not a valid json object', () => {
      jest.spyOn(console, 'error').mockReturnValueOnce();
      const value = 'abc';
      const result = LocalStorageService.parseJson(value);

      expect(result).toBeUndefined();
    });

    it('should return undefined if value is nullable', () => {
      expect(LocalStorageService.parseJson(undefined as any)).toBeUndefined();
      expect(LocalStorageService.parseJson(null)).toBeUndefined();
    });
  });

  describe('removeAuthToken', () => {
    it('should remove logged in user from localStorage', () => {
      localStorage.setItem('authToken', '123');

      LocalStorageService.removeAuthToken();
      const result = localStorage.getItem('authToken');

      expect(result).toBe(null);
    });
  });

  describe('setAuthToken', () => {
    it('should set logged in user in localStorage', () => {
      const token = '123';
      LocalStorageService.setAuthToken(token);
      const result = localStorage.getItem('authToken');

      expect(result).toBe(JSON.stringify(token));
    });
  });

  describe('getAuthToken', () => {
    it('should return user item from localStorage if set', () => {
      const token = '123';

      localStorage.setItem('authToken', JSON.stringify(token));
      const result = LocalStorageService.getAuthToken();

      expect(result).toStrictEqual(token);
    });
  });
});
