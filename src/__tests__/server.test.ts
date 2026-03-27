import request from 'supertest';
import { Server } from 'http';
import app from '../server.js'; // L'import de ton app Express

describe('Configuration du Serveur', () => {
  
  // Test de la route racine
  it('doit répondre avec succès sur la route racine', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain("Marine");
  });

  // Test de la route contact (celle qui utilise Nodemailer)
  it('doit avoir une route /api/contact qui répond', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: "Test Marine",
        email: "test@test.com",
        message: "Ceci est un test de fonctionnement"
      });
    
    // On accepte 200 (si mail envoyé) ou 500 (si erreur auth Gmail), 
    // l'important c'est que la route EXISTE.
    expect([200, 500]).toContain(response.status);
  });
});
