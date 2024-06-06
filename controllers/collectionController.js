import Collection from '../models/collection.js';

// Créer une nouvelle collecte
export function createCollection (req, res) {
  try {
    const newCollection = new Collection(req.body);
    const savedCollection = newCollection.save();
    res.status(201).json(savedCollection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lire toutes les collectes
export async function getCollections (req, res) {
  try {
    const collections = await Collection.find({});
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire une collecte par son ID
export const getCollectionById = async (req, res) => {
  try {
      const collectionId = req.params.id; 
      // Rechercher l'utilisateur dans la base de données
      const collection = await Collection.findById(collectionId);
      if (!collection) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.status(200).json(collection);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une collecte par son ID
  export async function updateCollection(req, res) {
    const { id } = req.params;
    const { collectionDate, collectionTime, status, comments } = req.body;
  
    try {
      const updatedCollection = await Collection.findByIdAndUpdate(id, { collectionDate, collectionTime, status, comments }, { new: true });
      if (updatedCollection) {
        res.status(200).json(updatedCollection);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Supprimer une collecte par son ID
  export function del (req, res) {
    try {
      const collectionId = req.params.id;
      Collection.findByIdAndDelete(collectionId);
      res.status(204).json({ message: 'Collecte supprimée' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export async function deleteCollection(req, res){
    try {
        const { id } = req.params;
        const deletedCollection = await Collection.findByIdAndDelete(id);
        if (!deletedCollection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.json({ message: "Collection deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  