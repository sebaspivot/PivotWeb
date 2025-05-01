import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase/firebaseConfig';
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
  const [gameType, setGameType] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [fieldCost, setFieldCost] = useState('');
  const [createdGames, setCreatedGames] = useState<any[]>([]);
  const [fieldData, setFieldData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = auth.currentUser?.uid;

  const loadCreatedGames = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const gamesRef = collection(getFirestore(), 'CreatedGames');
      const snapshot = await getDocs(gamesRef);
      const games = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (game: any) =>
            game.createdBy === userId &&
            game.date > Date.now() &&
            game.status === 'Sin confirmar'
        )
        .sort((a: any, b: any) => a.date - b.date);

      setCreatedGames(games);
    } catch (err) {
      alert('Error al cargar partidos');
    } finally {
      setLoading(false);
    }
  };

  const fetchFieldData = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(getFirestore(), 'fields', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) setFieldData(snap.data());
  };

  useEffect(() => {
    loadCreatedGames();
    fetchFieldData();
  }, []);

  const handleCreateGame = async () => {
    const user = auth.currentUser;
    if (!user || !gameType || !date || !fieldCost || !fieldData) {
      alert('Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const newGame = {
        gameType,
        date: date.getTime(),
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
        status: 'Sin confirmar',
        exclusive: false,
        totalPlayers: parseInt(gameType),
        currentPlayers: 0,
        jugadores: [],
        fieldData: {
          courtName: fieldData.courtName,
          address: fieldData.address,
          city: fieldData.city,
          cost: fieldCost,
          email: fieldData.email,
          fieldImage: fieldData.fieldImage || '',
          logoImage: fieldData.logoImage || '',
          role: fieldData.role || 'cancha',
          perfilCompleto: fieldData.perfilCompleto ?? true,
          ownerId: user.uid,
        },
      };

      const docRef = await addDoc(collection(getFirestore(), 'CreatedGames'), newGame);
      setCreatedGames((prev) => [...prev, { ...newGame, id: docRef.id }]);
      alert('Partido creado con éxito');
      setGameType(null);
      setDate(null);
      setFieldCost('');
    } catch (err) {
      alert('Error al crear partido');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(getFirestore(), 'CreatedGames', id));
    setCreatedGames((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear Partido</h1>

      <label className="block font-semibold mb-2">Tipo de fútbol</label>
      <div className="flex gap-2 mb-4 flex-wrap">
        {['5', '6', '7', '8', '9', '10', '11'].map((num) => (
          <button
            key={num}
            onClick={() => setGameType(num)}
            className={`px-4 py-2 border rounded ${gameType === num ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {num}
          </button>
        ))}
      </div>

      <label className="block font-semibold mb-2">Fecha y hora</label>
      <input
        type="datetime-local"
        className="w-full mb-4 border rounded p-2"
        value={date ? new Date(date).toISOString().slice(0, 16) : ''}
        onChange={(e) => setDate(new Date(e.target.value))}
      />

      <label className="block font-semibold mb-2">Costo de la cancha (COP)</label>
      <input
        type="number"
        value={fieldCost}
        onChange={(e) => setFieldCost(e.target.value)}
        className="w-full mb-6 border rounded p-2"
      />

      <button
        onClick={handleCreateGame}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded font-bold mb-10 hover:bg-gray-800"
      >
        {loading ? 'Creando...' : 'Crear Partido'}
      </button>

      <h2 className="text-xl font-bold mb-4">Partidos creados</h2>

      {createdGames.length === 0 && <p className="text-gray-500">No hay partidos aún.</p>}

      {createdGames.map((game) => (
        <div key={game.id} className="mb-6 border rounded-lg p-4 bg-gray-50 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{game.fieldData?.courtName}</h3>
              <p className="text-sm text-gray-600">{new Date(game.date).toLocaleString('es-CO')}</p>
              <p className="text-sm text-gray-600">Valor: {game.fieldData?.cost} COP</p>
              <p className="text-sm font-semibold mt-1">Estado: {game.status}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/games/${game.id}`)}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Ver Detalles
              </button>
              <button
                onClick={() => handleDelete(game.id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateGame;
