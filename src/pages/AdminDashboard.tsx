import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [fieldData, setFieldData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFieldData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/canchas');
        return;
      }

      const docRef = doc(getFirestore(), 'fields', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert('No se encontró el perfil de la cancha.');
        navigate('/createProfileFields');
        return;
      }

      setFieldData(docSnap.data());
      setLoading(false);
    };

    fetchFieldData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/canchas');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Cargando perfil de la cancha...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bienvenido, {fieldData.courtName}</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Botón para crear nuevo partido */}
        <div className="mb-6 flex flex-col sm:flex-row justify-end gap-4">
            <button
                onClick={() => navigate('/crear-partido')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            >
                Crear nuevo partido
            </button>
            <button
                onClick={() => navigate('/historial-partidos')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
            >
                Ver historial de partidos
            </button>
        </div>


        <div className="space-y-2">
          <p><strong>Ciudad:</strong> {fieldData.city}</p>
          <p><strong>Dirección:</strong> {fieldData.address}</p>
          {fieldData.logoImage && (
            <img
              src={fieldData.logoImage}
              alt="Logo"
              className="w-32 h-32 object-contain mt-4"
            />
          )}
          {fieldData.fieldImage && (
            <img
              src={fieldData.fieldImage}
              alt="Imagen de la cancha"
              className="w-full h-64 object-cover mt-4 rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
