// StoreSearchScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const GOOGLE_API_KEY = 'AIzaSyAb1DnglqLHm4kd8noRtVYgnOpJpmdjdUM'; // <-- Replace this

const StoreSearchScreen = () => {
  const [pincode, setPincode] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    if (!pincode) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Jan+Aushadhi+Kendra+near+${pincode}&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();
      setStores(data.results);
    } catch (error) {
      console.error('Error fetching store data:', error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find Nearby Jan Aushadhi Kendras</Text>
      <TextInput
        placeholder="Enter Pincode or Location"
        value={pincode}
        onChangeText={setPincode}
        style={styles.input}
      />
      <Button title="Search Stores" onPress={fetchStores} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#007AFF" />}

      <FlatList
        data={stores}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.formatted_address}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20, 
    marginTop: 30,
    backgroundColor: '#f4f4f4' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '600' },
  address: { fontSize: 14, color: '#555' },
});

export default StoreSearchScreen;
