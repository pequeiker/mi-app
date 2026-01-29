
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';



export default function MetaKilos() {
  const [kilos, setKilos] = useState<number | null>(null);
  const { setUserData } = useUser();
  const opciones = [2, 4, 6, 8, 10];

  return (
    <View style={styles.container}>

      {/* Barra de progreso */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '75%' }]} />
      </View>

      <Text style={styles.title}>
        ¿Cuántos kilos quieres cambiar?
      </Text>

      <Text style={styles.subtitle}>
        Es solo una meta aproximada
      </Text>

      {opciones.map((opcion) => (
        <TouchableOpacity
          key={opcion}
          style={[styles.option, kilos === opcion && styles.selected]}
          onPress={() => setKilos(opcion)}
        >
          <Text style={[styles.optionText, kilos === opcion && styles.selectedText]}>
            {opcion} kg
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
      style={styles.button}
       onPress={() => {
       setUserData({ objetivo: 'subir' });
        router.push('/cuerpo');
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
    padding: 24,
    justifyContent: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 30,
  },
  progress: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  option: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.4,
  },
  nextText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
button: {
  backgroundColor: '#000',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});
