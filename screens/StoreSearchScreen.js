import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const StoreSearchScreen = () => {
  const [pincode, setPincode] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const fetchStores = async () => {
    if (!pincode) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://janaushadhi.gov.in/ProductAvailability/SearchMedicalStoreByPincode?pincode=${pincode}`
      );
      const data = await response.json();

      if (data && data.lstStoreMaster && data.lstStoreMaster.length > 0) {
        // For each store, get coordinates
        const withCoordinates = await Promise.all(
          data.lstStoreMaster.map(async (store) => {
            const query = encodeURIComponent(store.StoreAddress);
            const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
            const geoData = await geoResp.json();

            if (geoData.length > 0) {
              return {
                ...store,
                lat: parseFloat(geoData[0].lat),
                lon: parseFloat(geoData[0].lon),
              };
            } else {
              return { ...store };
            }
          })
        );

        const validStores = withCoordinates.filter((s) => s.lat && s.lon);

        if (validStores.length > 0) {
          setRegion({
            latitude: validStores[0].lat,
            longitude: validStores[0].lon,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          });
        }

        setStores(validStores);
      } else {
        setStores([]);
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
      setStores([]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find Nearby Jan Aushadhi Kendras</Text>
      <TextInput
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Search Stores" onPress={fetchStores} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#007AFF" />}

      {stores.length > 0 && (
        <MapView style={styles.map} region={region}>
          {stores.map((store) =>
            store.lat && store.lon ? (
              <Marker
                key={store.Id}
                coordinate={{ latitude: store.lat, longitude: store.lon }}
                title={store.StoreName}
                description={store.StoreAddress}
              />
            ) : null
          )}
        </MapView>
      )}

      <FlatList
        data={stores}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.StoreName}</Text>
            <Text style={styles.address}>{item.StoreAddress}</Text>
            <Text style={styles.address}>Contact: {item.Mobile}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    backgroundColor: '#f4f4f4',
  },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  map: {
    width: width - 40,
    height: 250,
    marginTop: 15,
    borderRadius: 12,
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
