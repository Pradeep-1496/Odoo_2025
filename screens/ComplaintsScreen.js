// ComplaintsScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Alert,
} from "react-native";

const ComplaintsScreen = () => {
  const [complaints, setComplaints] = useState([
    {
      id: "1",
      user: "Ravi Kumar",
      description: "No proper supply of medicines in Jan Aushadhi Kendra.",
    },
    {
      id: "2",
      user: "Priya Sharma",
      description: "Ration not distributed in my area since 2 months.",
    },
  ]);

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignee, setAssignee] = useState("");

  const handleAssign = (complaint) => {
    setSelectedComplaint(complaint);
    setAssignModalVisible(true);
  };

  const confirmAssign = () => {
    Alert.alert("Assigned", `Complaint assigned to ${assignee}`);
    setAssignModalVisible(false);
    setAssignee("");
  };

  const handleTake = (complaintId) => {
    setComplaints((prev) => prev.filter((item) => item.id !== complaintId));
    Alert.alert("Completed", "Complaint marked as completed");
  };

  const renderComplaint = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.assignBtn}
          onPress={() => handleAssign(item)}
        >
          <Text style={styles.buttonText}>Assign</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.takeBtn}
          onPress={() => handleTake(item.id)}
        >
          <Text style={styles.buttonText}>Take</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Complaints</Text>
      <FlatList
        data={complaints}
        renderItem={renderComplaint}
        keyExtractor={(item) => item.id}
      />

      {/* Assign Modal */}
      <Modal
        visible={assignModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAssignModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Assign To
            </Text>
            <TextInput
              placeholder="Enter team member name"
              value={assignee}
              onChangeText={setAssignee}
              style={styles.input}
            />
            <Button title="Confirm Assign" onPress={confirmAssign} />
            <View style={{ height: 10 }} />
            <Button
              title="Cancel"
              onPress={() => setAssignModalVisible(false)}
              color="gray"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  user: { fontSize: 16, fontWeight: "bold", color: "#333" },
  description: { fontSize: 14, marginVertical: 8, color: "#555" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  assignBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  takeBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "600" },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});

export default ComplaintsScreen;
