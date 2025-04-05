import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function SurveyDetail({ route }) {
  const { title } = route.params;

  const surveyData = [
    {
      question: "1. What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    },
    {
      question: "2. How many hours do you work out each week?",
      options: ["0-2", "3-5", "6-8", "More than 8"],
    },
    {
      question: "3. Do you think waste is managed properly in your area?",
      options: ["Yes", "No", "Sometimes", "Not Sure"],
    },
    {
      question: "4. Are local parks clean and safe?",
      options: ["Very Clean", "Somewhat Clean", "Not Clean", "Unsafe"],
    },
    {
      question: "5. Would you rate your current education facility as excellent?",
      options: ["Yes", "No", "Average", "Need Improvement"],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionPress = (qIndex, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: selectedOption,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {surveyData.map((item, idx) => (
        <View key={idx} style={styles.questionBlock}>
          <Text style={styles.question}>{item.question}</Text>
          {item.options.map((option, optIdx) => {
            const isSelected = selectedAnswers[idx] === option;

            return (
              <TouchableOpacity
                key={optIdx}
                style={[
                  styles.option,
                  isSelected && styles.selected,
                ]}
                onPress={() => handleOptionPress(idx, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  questionBlock: {
    marginBottom: 25,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  option: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: "#c8e6c9", // light green
  },
  optionText: {
    fontSize: 15,
    color: "#444",
  },
});
