import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase/firebaseConfig';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const FieldRegister = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gamesPlayed, setGamesPlayed] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('Usuario no autenticado');
        navigate('/canchas');
        return;
      }

      try {
        const fieldRef = doc(getFirestore(), 'fields', user.uid);
        const fieldSnap = await getDoc(fieldRef);

        if (fieldSnap.exists()) {
          setUserData(fieldSnap.data());
        } else {
          alert('No se encontró el perfil de la cancha');
          navigate('/createProfileFields');
        }
      } catch (error) {
        console.error(error);
        alert('Error al obtener la información del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserGames = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const gamesRef = collection(getFirestore(), 'CreatedGames');
        const snapshot = await getDocs(gamesRef);

        const gamesData = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            if (!data?.fieldData || data.fieldData.ownerId !== user.uid) return null;

            const date = new Date(data.date);
            const endDate = new Date(date.getTime() + 60 * 60 * 1000);
            const totalPlayers = parseInt(data.gameType) * 2;
            const currentPlayers = data.currentPlayers || 0;
            const wasConfirmed = currentPlayers >= totalPlayers - 2;

            let status = data.status || 'Sin confirmar';

            if (new Date() > endDate) {
              status = wasConfirmed ? 'Jugado' : 'No jugado';
            } else {
              return null;
            }

            return {
              id: docSnap.id,
              date: data.date,
              fieldData: data.fieldData,
              status,
            };
          })
          .filter((g) => g !== null)
          .sort((a, b) => b!.date - a!.date);

        setGamesPlayed(gamesData as any[]);
      } catch (error) {
        console.error('Error al cargar los partidos:', error);
      }
    };

    fetchUserGames();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700">Cargando...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-semibold text-red-600">No se encontró el perfil.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Historial de Partidos Jugados</h1>

      <div className="mb-6">
        <p className="font-medium text-gray-700">Partidos jugados: <span className="text-black">{gamesPlayed.filter(g => g.status === 'Jugado').length}</span></p>
      </div>

      {gamesPlayed.length > 0 ? (
        gamesPlayed.map((game, idx) => (
          <div key={idx} className="bg-gray-100 rounded-lg p-4 mb-4 shadow">
            <h3 className="font-bold text-lg mb-1">{game.fieldData.courtName}</h3>
            <p className={`mb-2 font-semibold ${game.status === 'Jugado' ? 'text-green-600' : 'text-orange-600'}`}>
              {new Date(game.date).toLocaleDateString()} — {game.status === 'Jugado' ? 'Jugado ✅' : 'No jugado ⚠️'}
            </p>
            <button
              onClick={() => navigate(`/games/${game.id}`)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Ver Detalles
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No se han jugado partidos aún.</p>
      )}
    </div>
  );
};

export default FieldRegister;
