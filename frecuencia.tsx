import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';

export default function Frecuencia() {
  // 🔹 estado local (opciones)
 const [frecuencia, setFrecuencia] = useState<string | undefined>(undefined);

  // 🔹 contexto global
  const { setUserData } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuántos días a la semana entrenas?</Text>

      {/* OPCIONES */}
      <TouchableOpacity
        style={[
          styles.option,
          frecuencia === '1-2' && styles.selected
        ]}
        onPress={() => setFrecuencia('1-2')}
      >
        <Text style={styles.optionText}>1 – 2 días</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          frecuencia === '3-4' && styles.selected
        ]}
        onPress={() => setFrecuencia('3-4')}
      >
        <Text style={styles.optionText}>3 – 4 días</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          frecuencia === '5+' && styles.selected
        ]}
        onPress={() => setFrecuencia('5+')}
      >
        <Text style={styles.optionText}>5 o más</Text>
      </TouchableOpacity>

      {/* BOTÓN SIGUIENTE */}
      <TouchableOpacity
        style={[
          styles.button,
          !frecuencia && { opacity: 0.5 }
        ]}
        disabled={!frecuencia}
        onPress={() => {
          setUserData({frecuencia});
          router.push('/datos');
        }}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#000',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
