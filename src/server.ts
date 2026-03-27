import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ou ton fournisseur (outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get('/', (req: Request, res: Response) => {
  res.send("Le serveur backend de Marine est bien en ligne en TypeScript ! 🚀");
});

// ROUTE CONTACT : C'est elle qui va faire passer le test au vert
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Configuration de l'e-mail
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Tu t'envoies le mail à toi-même
    subject: `Nouveau message de Portfolio : ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur Nodemailer:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default app;