import User from '../models/user.js';

// Créer un nouvel utilisateur
export function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lire tous les utilisateurs
export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Lire un utilisateur par son ID
export const getUserById = async (req, res) => {
  try {
      const userId = req.params.id; 
      // Rechercher l'utilisateur dans la base de données
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur par son ID
export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, location, phone, photo } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, location, phone, photo }, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Supprimer un utilisateur par son ID
export async function deleteUser(req, res){
  try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
