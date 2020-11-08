import { builder } from 'testsHelpers';
import LocalStorageService, { Item } from './LocalStorageService';

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

  describe('getError', () => {
    it('should return error item from localStorage if set', () => {
      const error = 'test';
      localStorage.setItem(Item.error, error);

      const result = LocalStorageService.getError();

      expect(result).toBe(error);
    });
  });

  describe('getLocale', () => {
    it('should return locale item from localStorage if set', () => {
      const locale = 'lt';
      localStorage.setItem(Item.locale, locale);

      const result = LocalStorageService.getLocale();

      expect(result).toBe(locale);
    });

    it('should return en if locale is not set', () => {
      const result = LocalStorageService.getLocale();

      expect(result).toBe('en');
    });
  });

  describe('removeLoggedInUser', () => {
    it('should remove logged in user from localStorage', () => {
      localStorage.setItem(Item.user, 'user');

      LocalStorageService.removeLoggedInUser();
      const result = localStorage.getItem(Item.user);

      expect(result).toBe(null);
    });
  });

  describe('setLoggedInUser', () => {
    it('should set logged in user in localStorage', () => {
      const user = builder.loggedInUser.build();

      LocalStorageService.setLoggedInUser(user);
      const result = localStorage.getItem(Item.user);

      expect(result).toBe(JSON.stringify(user));
    });
  });

  describe('getLoggedInUser', () => {
    it('should return user item from localStorage if set', () => {
      const user = builder.loggedInUser.build();

      localStorage.setItem(Item.user, JSON.stringify(user));
      const result = LocalStorageService.getLoggedInUser();

      expect(result).toStrictEqual(user);
    });
  });

  describe('getDefaultOpenWithActions', () => {
    it('should return defaultOpenWithActions item from localStorage if set', () => {
      const defaultOpenWithActions = { pdf: 'open', txt: 'download' };
      localStorage.setItem(Item.defaultOpenWithActions, JSON.stringify(defaultOpenWithActions));
      const result = LocalStorageService.getDefaultOpenWithActions();

      expect(result).toStrictEqual(defaultOpenWithActions);
    });
  });

  describe('getDefaultOpenWithActionByExtension', () => {
    it('should return defaultOpenWithActions item from localStorage if set', () => {
      const defaultOpenWithActions = { pdf: 'open', txt: 'download' };
      localStorage.setItem(Item.defaultOpenWithActions, JSON.stringify(defaultOpenWithActions));
      const result = LocalStorageService.getDefaultOpenWithActionByExtension('pdf');

      expect(result).toStrictEqual('open');
    });
  });

  describe('getLoggedInUserId', () => {
    it('should return null if no user in localStorage', () => {
      const result = LocalStorageService.getLoggedInUserId();

      expect(result).toBe(null);
    });
    it('should return user id from localStorage if set', () => {
      const user = {
        userId: 1,
        sessionId: 'abc123',
        username: 'test',
        userDisplayName: 'test',
      };

      localStorage.setItem(Item.user, JSON.stringify(user));
      const result = LocalStorageService.getLoggedInUserId();

      expect(result).toBe(1);
    });
  });

  describe('getPresetsByArchive', () => {
    it('should return empty array if no presets in localStorage', () => {
      const result = LocalStorageService.getPresetsByArchive(1);

      expect(result).toStrictEqual([]);
    });

    it('should return preset array by given id', () => {
      const archiveId = 1;
      const presetArray = [{ id: 1, name: 'test' }];

      localStorage.setItem(Item.presets, JSON.stringify({ [archiveId]: presetArray }));
      const result = LocalStorageService.getPresetsByArchive(archiveId);

      expect(result).toStrictEqual(presetArray);
    });
  });

  describe('getLastPresetId', () => {
    it('should return 1 if no presets are set', () => {
      const result = LocalStorageService.getLastPresetId(1);

      expect(result).toBe(1);
    });

    it('should restur last preset id + 1 if presets are set', () => {
      const archiveId = 1;
      const presetArray = [{ id: 1, name: 'test' }];

      localStorage.setItem(Item.presets, JSON.stringify({ [archiveId]: presetArray }));
      const result = LocalStorageService.getLastPresetId(archiveId);

      expect(result).toStrictEqual(2);
    });
  });

  describe('saveNewPreset', () => {
    it('should add new preset to non existing presets', () => {
      const archiveId = 1;
      const preset = { id: 1, name: 'test' };
      LocalStorageService.saveNewPreset(archiveId, preset);

      const result = localStorage.getItem(Item.presets);

      expect(result).toBe(JSON.stringify({ [archiveId]: [preset] }));
    });

    it('should add new preset to existing presets', () => {
      const archiveId = 1;
      const presetArray = [{ id: 1, name: 'test' }];
      const newPreset = { id: 2, name: 'test2' };

      localStorage.setItem(Item.presets, JSON.stringify({ [archiveId]: presetArray }));
      LocalStorageService.saveNewPreset(archiveId, newPreset);

      const result = localStorage.getItem(Item.presets);

      expect(result).toBe(JSON.stringify({ [archiveId]: [...presetArray, newPreset] }));
    });
  });

  describe('updatePreset', () => {
    it('should update preset in localStorage', () => {
      const archiveId = 1;
      const presetArray = [{ id: 1, name: 'test' }];
      const newPreset = { id: 1, name: 'test2' };
      localStorage.setItem(Item.presets, JSON.stringify({ [archiveId]: presetArray }));
      LocalStorageService.updatePreset(archiveId, newPreset);

      const result = localStorage.getItem(Item.presets);

      expect(result).toBe(JSON.stringify({ [archiveId]: [newPreset] }));
    });
  });

  describe('setDefaultOpenWithActions', () => {
    it('should update preset in localStorage', () => {
      const defaultOpenWithActions = { pdf: 'open', txt: 'download' };
      localStorage.setItem(Item.defaultOpenWithActions, JSON.stringify(defaultOpenWithActions));
      LocalStorageService.setDefaultOpenWithActions('pdf', 'download');

      const result = localStorage.getItem(Item.defaultOpenWithActions);

      expect(result).toBe(JSON.stringify({ pdf: 'download', txt: 'download' }));
    });
  });

  describe('deletePreset', () => {
    it('should delete preset in localStorage', () => {
      const archiveId = 1;
      const presetArray = [{ id: 1, name: 'test' }];
      localStorage.setItem(Item.presets, JSON.stringify({ [archiveId]: presetArray }));
      LocalStorageService.deletePreset(1, archiveId);

      const result = localStorage.getItem(Item.presets);

      expect(result).toBe(JSON.stringify({ [archiveId]: [] }));
    });
  });
});
