import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from './context/UserContext';


export default function Datos() {
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const { setUserData } = useUser();


  const listo = edad && peso && estatura;

  return (
    <View style={styles.container}>

      {/* Barra de progreso */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '60%' }]} />
      </View>

      <Text style={styles.title}>Tus datos</Text>

      <TextInput
        style={styles.input}
        placeholder="Edad (años)"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Estatura (cm)"
        keyboardType="numeric"
        value={estatura}
        onChangeText={setEstatura}
      />

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
   setUserData({
  peso: Number(peso),
  estatura: Number(estatura),
  edad: Number(edad),
});
router.push('/objetivo');
 // cambia según la pantalla
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
    marginBottom: 40,
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
    marginBottom: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    marginBottom: 16,
 
  }
  ,
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
})
