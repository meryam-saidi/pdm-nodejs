import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (password === user.password) {
                const token = jwt.sign(
                    { id: user._id }, // Utiliser l'ID de l'utilisateur pour la création du token
                    "key",
                    { expiresIn: "90d" }
                );
                res.status(200).json({ token }); // Envoi du token en cas de succès
            } else {
                res.status(401).json({ message: "Mot de passe incorrect" }); // Mauvais mot de passe
            }
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" }); // Utilisateur non trouvé
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Erreur serveur
    }
}
