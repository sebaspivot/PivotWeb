import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../lib/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const CanchasLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(getFirestore(), 'fields', user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        alert('Este correo no corresponde a una cancha registrada.');
        return;
      }

      const userData = docSnap.data();

      const isProfileComplete =
        userData.courtName &&
        userData.logoImage &&
        userData.fieldImage &&
        userData.city &&
        userData.address;

      if (!isProfileComplete) {
        alert('Perfil incompleto. Por favor completa tu perfil.');
        navigate('/createProfileFields');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      alert('Correo o contraseña incorrectos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-6 bg-neutral-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition duration-300"
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <span
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate('/registerField')}
          >
            Regístrate aquí
          </span>
        </div>
      </form>
    </div>
  );
};

export default CanchasLogin;
