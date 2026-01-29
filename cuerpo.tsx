
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';

export default function Cuerpo() {
  const [tipo, setTipo] = useState<string | null>(null);
  const { setUserData } = useUser();
  const [tipoCuerpo, setTipoCuerpo] = useState<string | null>(null);


  return (
    <View style={styles.container}>

      {/* Barra de progreso */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '70%' }]} />
      </View>

      <Text style={styles.title}>¿Cuál se parece más a ti?</Text>

      <TouchableOpacity
        style={[styles.card, tipoCuerpo === 'ecto' && styles.selected]}
        onPress={() => setTipoCuerpo('ecto')}
      >
        <Text style={styles.cardTitle}>Ectomorfo</Text>
        <Text style={styles.cardText}>
          Delgado, le cuesta subir peso.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, tipoCuerpo === 'meso' && styles.selected]}
        onPress={() => setTipoCuerpo('meso')}
      >
        <Text style={styles.cardTitle}>Mesomorfo</Text>
        <Text style={styles.cardText}>
          Atlético, gana músculo con facilidad.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, tipoCuerpo === 'endo' && styles.selected]}
        onPress={() => setTipoCuerpo('endo')}
      >
        <Text style={styles.cardTitle}>Endomorfo</Text>
        <Text style={styles.cardText}>
          Tiende a acumular grasa fácilmente.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    if (!tipoCuerpo) return;

    setUserData({ Cuerpo: tipoCuerpo });
    router.push('/calorias');
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
    marginBottom: 24,
  },
  card: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  selected: {
    backgroundColor: '#000',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
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
