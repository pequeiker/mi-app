import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';

export default function Calorias() {
  const { userData } = useUser();
  const [calorias, setCalorias] = useState<number>(0);

  useEffect(() => {
    let base = 2000;

    if (userData.objetivo === 'subir') base += 300;
    if (userData.objetivo === 'bajar') base -= 300;

    if (userData.frecuencia === 'alta') base += 200;
    if (userData.frecuencia === 'baja') base -= 200;

    setCalorias(base);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus calorías diarias</Text>

      <Text style={styles.calorias}>{calorias} kcal</Text>
{/* Gráfica de progreso */}
<View style={styles.graphContainer}>
  <Text style={styles.graphTitle}>Progreso estimado</Text>

  <View style={styles.graphBackground}>
    <View style={styles.graphFill} />
  </View>

  
  <Text style={styles.graphText}>
    Aproximadamente 6–8 semanas para tu meta
  </Text>
</View>

      {/* “IA” recomendando comidas */}
      <View style={styles.box}>
        <Text style={styles.subtitle}>Sugerencia inteligente</Text>
        <Text style={styles.text}>
          Si consumes aproximadamente {calorias} calorías al día repartidas en
          3–4 comidas balanceadas, podrás alcanzar tu objetivo de forma saludable.
        </Text>

        <Text style={styles.text}>
          Ejemplo:
          {'\n'}• Desayuno: avena con fruta
          {'\n'}• Comida: pollo con arroz
          {'\n'}• Cena: huevos con verduras
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/resumen')}
      >
        <Text style={styles.buttonText}>Ver resumen</Text>
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
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calorias: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBackground: {
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  progressFill: {
    width: '35%',
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
  },
  box: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
  },
  button: {
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
graphContainer: {
  marginVertical: 30,
},

graphTitle: {
  fontSize: 16,
  marginBottom: 10,
  textAlign: 'center',
},

graphBackground: {
  width: '100%',
  height: 22,
  backgroundColor: '#e0e0e0',
  borderRadius: 11,
  overflow: 'hidden',
},

graphFill: {
  width: '40%', // porcentaje visible
  height: '100%',
  backgroundColor: '#000',
},

graphText: {
  marginTop: 8,
  textAlign: 'center',
  fontSize: 13,
},

});
