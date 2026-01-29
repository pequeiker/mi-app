import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';

export default function Objetivo() {
  const { setUserData } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        ¿Cuál es tu objetivo?
      </Text>

      <TouchableOpacity
        onPress={() => {
          setUserData({ objetivo: 'subir' });
          router.push('/calorias');
        }}
        style={{ padding: 15, backgroundColor: '#000', marginBottom: 10 }}
      >
        <Text style={{ color: '#fff' }}>Subir de peso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setUserData({ objetivo: 'bajar' });
          router.push('/meta-kilos');
        }}
        style={{ padding: 15, backgroundColor: '#000' }}
      >
        <Text style={{ color: '#fff' }}>Bajar de peso</Text>
      </TouchableOpacity>
    </View>
  );
}
