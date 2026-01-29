import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Barra de progreso */}
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>

      {/* Pregunta */}
      <Text style={styles.title}>¿Eres principiante?</Text>

      {/* Opciones */}
      <TouchableOpacity
        style={[
          styles.option,
          respuesta === 'si' && styles.selected
        ]}
        onPress={() => setRespuesta('si')}
      >
        <Text style={[
          styles.optionText,
          respuesta === 'si' && styles.selectedText
        ]}>
          Sí
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          respuesta === 'no' && styles.selected
        ]}
        onPress={() => setRespuesta('no')}
      >
        <Text style={[
          styles.optionText,
          respuesta === 'no' && styles.selectedText
        ]}>
          No
        </Text>
      </TouchableOpacity>

      {/* Botón siguiente */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !respuesta && styles.disabled
        ]}
        disabled={!respuesta}
        onPress={() => router.push('/frecuencia')}
      >
        <Text style={styles.nextText}>Siguiente</Text>
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
    marginBottom: 40,
  },

  progress: {
    width: '10%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  option: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
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
    marginTop: 30,
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
});
