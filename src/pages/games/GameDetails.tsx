import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { auth } from '../../../lib/firebase/firebaseConfig';

const GameDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [mvpName, setMvpName] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [canVote, setCanVote] = useState(false);
  const [canCountMVP, setCanCountMVP] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const userId = auth.currentUser?.uid;
        const ref = doc(getFirestore(), 'CreatedGames', id!);
        const snap = await getDoc(ref);
        if (!snap.exists()) return;

        const data = snap.data();
        const gameDate = new Date(data.date);
        const voteDeadline = new Date(gameDate.getTime() + 24 * 60 * 60 * 1000);
        const now = new Date();

        const votos = data.mvpVotes || {};
        const jugadores = data.jugadores || [];
        const voteCounts: Record<string, number> = {};
        Object.values(votos).forEach((uid) => {
          voteCounts[uid as string] = (voteCounts[uid as string] || 0) + 1;
        });

        const topUid = Object.keys(voteCounts).reduce((a, b) => (voteCounts[a] > voteCounts[b] ? a : b), '');

        setGame({ ...data, id: snap.id, mvpUid: topUid });
        setMvpName(topUid || null);
        setUserVote(userId ? votos[userId] : null);
        setCanVote(now <= voteDeadline && data.status === 'jugado');
        setCanCountMVP(now > voteDeadline && !data.mvpAlreadyCounted);

        setPlayers(jugadores);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const voteMVP = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId || !selected || !canVote) return;
    if (userId === selected.uid) return alert('No puedes votarte a ti mismo');

    const ref = doc(getFirestore(), 'CreatedGames', game.id);
    const snap = await getDoc(ref);
    const data = snap.data();
    const votos = data?.mvpVotes || {};
    if (votos[userId]) return alert('Ya votaste');

    votos[userId] = selected.uid;
    await updateDoc(ref, { mvpVotes: votos });
    setUserVote(selected.uid);
    alert('Voto registrado');
  };

  const cancelVote = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId || !userVote || !canVote) return;
    const ref = doc(getFirestore(), 'CreatedGames', game.id);
    const snap = await getDoc(ref);
    const data = snap.data();
    const votos = data?.mvpVotes || {};
    delete votos[userId];
    await updateDoc(ref, { mvpVotes: votos });
    setUserVote(null);
    alert('Voto cancelado');
  };

  const countFinalMVP = async () => {
    const ref = doc(getFirestore(), 'CreatedGames', game.id);
    const snap = await getDoc(ref);
    const data = snap.data();
    const votos = data?.mvpVotes || {};
    const counts: Record<string, number> = {};
    Object.values(votos).forEach((uid) => {
      counts[uid as string] = (counts[uid as string] || 0) + 1;
    });

    if (Object.keys(counts).length === 0) return alert('No hay votos');
    const max = Math.max(...Object.values(counts));
    const top = Object.entries(counts).filter(([_, v]) => v === max).map(([k]) => k);
    const winner = top[Math.floor(Math.random() * top.length)];

    await updateDoc(doc(getFirestore(), 'users', winner), { mvpCount: increment(1) });
    await updateDoc(ref, { mvpAlreadyCounted: true, mvpUid: winner });
    setGame({ ...game, mvpAlreadyCounted: true, mvpUid: winner });
    alert('MVP actualizado');
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!game) return <p>No se encontró el partido</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del Partido</h1>

      {mvpName && (
        <div className="bg-yellow-100 p-4 rounded mb-4">
          🏆 MVP del partido: <strong>{mvpName}</strong>
          {canCountMVP && (
            <button onClick={countFinalMVP} className="ml-4 px-3 py-1 bg-green-600 text-white rounded">
              Confirmar MVP final
            </button>
          )}
        </div>
      )}

      <p><strong>Cancha:</strong> {game.fieldData?.courtName}</p>
      <p><strong>Dirección:</strong> {game.fieldData?.address}</p>
      <p><strong>Fecha:</strong> {new Date(game.date).toLocaleString('es-CO')}</p>
      <p><strong>Estado:</strong> {game.status}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Jugadores</h2>
      <ul className="grid grid-cols-2 gap-4">
        {players.map((p, i) => (
          <li key={i} className="border p-3 rounded shadow-sm bg-white">
            <p className="font-semibold">{p.name}</p>
            {userVote === p.uid && <span className="text-yellow-500">⭐ Votado</span>}
            <button
              onClick={() => setSelected(p)}
              className="mt-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Votar MVP
            </button>
          </li>
        ))}
      </ul>

      {userVote && canVote && (
        <button onClick={cancelVote} className="mt-6 px-4 py-2 bg-red-600 text-white rounded">
          Cancelar voto
        </button>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2">Votar por {selected.name}</h3>
            <button
              onClick={voteMVP}
              className="w-full bg-green-600 text-white py-2 rounded mb-2"
            >
              Confirmar voto
            </button>
            <button
              onClick={() => setSelected(null)}
              className="w-full bg-gray-300 text-black py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
