import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

// Charge les variables du fichier .env
dotenv.config();

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares (les "douaniers")
app.use(cors()); // Autorise ton portfolio React à communiquer avec ce serveur
app.use(express.json()); // Permet au serveur de comprendre les données JSON

// Route de test (pour vérifier que le serveur répond)
app.get('/', (req: Request, res: Response) => {
  res.send("Le serveur backend de Marine est bien en ligne en TypeScript ! 🚀");
});

// Lancement du serveur (la boucle qui garde le serveur éveillé)
app.listen(PORT, () => {
  console.log(`Serveur démarré avec succès sur http://localhost:${PORT}`);
});