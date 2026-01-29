// app/resumen.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';

const SERVER_URL = 'http://<TU_IP_O_NGROK>:3000'; // <- Cambia esto

export default function Resumen() {
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlanIA | null>(null);
  const [error, setError] = useState<string | null>(null);

type RutinaItem = {
  nombre: string;
  descripcion: string;
  tiempo_o_series: string;
  imagen?: string | null;
};

type ComidaItem = {
  nombre: string;
  descripcion: string;
  kcal?: string;
};

type PlanIA = {
  rutina: RutinaItem[];
  comidas: ComidaItem[];
  tiempo_estimado_semanas: number;
  nota: string;
};

  useEffect(() => {
    if (!userData) return;
    generatePlan();
  }, [userData]);

  async function generatePlan() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${SERVER_URL}/generate-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const json = await res.json();
      if (res.ok) {
        setPlan(json);
      } else {
        setError(json.error || 'Error generating plan');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar al servidor. Revisa la URL.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Generando plan inteligente...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <TouchableOpacity onPress={generatePlan} style={styles.retry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.center}>
        <Text>No hay plan aún. Completa el onboarding.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tu plan personalizado</Text>

      <Text style={styles.subtitle}>Tiempo estimado: {plan.tiempo_estimado_semanas} semanas</Text>
      <Text style={styles.note}>{plan.nota}</Text>

      <Text style={styles.sectionTitle}>Rutina recomendada</Text>
      {plan.rutina.map((ej: RutinaItem, i: number) => (
        <View key={i} style={styles.card}>
          {ej.imagen ? (
            <Image source={{ uri: ej.imagen }} style={styles.image} resizeMode="contain" />
          ) : null}
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{ej.nombre}</Text>
            <Text style={styles.cardText}>{ej.descripcion}</Text>
            <Text style={styles.cardMeta}>{ej.tiempo_o_series}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Sugerencias de comidas</Text>
     {plan.comidas.map((c: ComidaItem, i: number) => (
        <View key={i} style={styles.food}>
          <Text style={styles.foodTitle}>{c.nombre} — {c.kcal ? `${c.kcal} kcal` : ''}</Text>
          <Text style={styles.cardText}>{c.descripcion}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Descarga', 'Función de exportar en desarrollo')}
      >
        <Text style={styles.buttonText}>Exportar plan (PDF)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 6 },
  note: { fontSize: 13, color: '#666', marginBottom: 12 },
  sectionTitle: { fontSize: 18, marginTop: 10, marginBottom: 8, fontWeight: 'bold' },
  card: { flexDirection: 'row', gap: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, alignItems: 'center' },
  image: { width: 90, height: 90, marginRight: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardText: { color: '#333', marginTop: 6 },
  cardMeta: { color: '#666', marginTop: 6, fontSize: 13 },
  food: { marginBottom: 12, padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 8 },
  foodTitle: { fontWeight: 'bold' },
  button: { marginTop: 20, backgroundColor: '#000', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  retry: { marginTop: 10, backgroundColor: '#000', padding: 10, borderRadius: 8 },
  retryText: { color: '#fff' },
});
