import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Prediccion() {
  const router = useRouter();

  // 👉 Valores simulados (luego los conectamos)
  const kilosObjetivo = 6; // kg a subir o bajar
  const objetivo = 'subir'; // subir | bajar

  // Ritmos seguros aproximados
  const ritmoSemanal = objetivo === 'subir' ? 0.4 : 0.5; // kg/semana

  const semanas = Math.ceil(kilosObjetivo / ritmoSemanal);

  const mensajeIA =
    objetivo === 'subir'
      ? `Si mantienes este plan de forma constante, podrías subir aproximadamente ${kilosObjetivo} kg en unas ${semanas} semanas.`
      : `Siguiendo este plan, podrías bajar alrededor de ${kilosObjetivo} kg en aproximadamente ${semanas} semanas.`;

  return (
    <View style={styles.container}>

      {/* Barra de progreso */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '90%' }]} />
      </View>

      <Text style={styles.title}>Tu progreso estimado</Text>

      <View style={styles.card}>
        <Text style={styles.weeks}>{semanas}</Text>
        <Text style={styles.subtitle}>semanas aprox.</Text>
      </View>

      <Text style={styles.text}>
        {mensajeIA}
      </Text>

      <Text style={styles.note}>
        *Esta es una estimación basada en constancia y hábitos saludables.
      </Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.nextText}>Ver gráfica de progreso</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  weeks: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
  },
  note: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
  },
  nextText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
