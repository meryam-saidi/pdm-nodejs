import SurplusFood from '../models/surplusFood.js';

// Créer un nouvel excédent alimentaire
export function createSurplusFood (req, res) {
  try {
    const newSurplusFood = new SurplusFood(req.body);
    const savedSurplusFood = newSurplusFood.save();
    res.status(201).json(savedSurplusFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lire tous les excédents alimentaires
export async function getSurplusFoods (req, res) {
  try {
    const surplusFoods = await SurplusFood.find({});
    res.status(200).json(surplusFoods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire un excédent alimentaire par son ID
export const getSurplusFoodById = async (req, res) => {
    try {
        const surplusFoodId = req.params.id; 
        // Rechercher l'utilisateur dans la base de données
        const surplusFood = await SurplusFood.findById(surplusFoodId);
        if (!surplusFood) {
            return res.status(404).json({ message: "Excédent alimentaire introuvable" });
        }
  
        res.status(200).json(surplusFood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  // Mettre à jour un excédent alimentaire par son ID
export async function updateSurplusFood(req, res) {
  const { id } = req.params;
  const { foodType, quantity, expirationDate, description, photos } = req.body;

  try {
    const updatedSurplusFood = await SurplusFood.findByIdAndUpdate(id, { foodType, quantity, expirationDate, description, photos }, { new: true });
    if (updatedSurplusFood) {
      res.status(200).json(updatedSurplusFood);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  // Supprimer un excédent alimentaire par son ID
  export async function deleteSurplusFood(req, res){
    try {
        const { id } = req.params;
        const deleteSurplusFood = await SurplusFood.findByIdAndDelete(id);
        if (!deleteSurplusFood) {
            return res.status(404).json({ message: "Excédent alimentaire non trouvé" });
        }
        res.json({ message: "Excédent alimentaire supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };