import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://mock-storage.example.com/*', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.all('https://firestore.googleapis.com/*', () => {
    return HttpResponse.json({ documents: [] });
  }),

  http.all('https://identitytoolkit.googleapis.com/*', () => {
    return HttpResponse.json({
      idToken: 'mock-id-token',
      email: 'test@example.com',
      refreshToken: 'mock-refresh-token',
      expiresIn: '3600',
      localId: 'mock-local-id',
    });
  }),
];
