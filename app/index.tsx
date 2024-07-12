import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Provider as PaperProvider,
} from "react-native-paper";

// Define the Pet interface
interface Pet {
  name: string;
  type: string;
  breed: string;
  weight: string;
  color: string;
}

const Index: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  useEffect(() => {
    fetch("https://petdata.free.beeceptor.com/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pet data:", error));
  }, []);

  const handlePetSelection = (petName: string) => {
    const pet = pets.find((p) => p.name === petName) || null;
    setSelectedPet(pet);
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Pet viewer" />
      </Appbar.Header>
      <View style={styles.container}>
        <Title style={styles.title}>Select a Pet</Title>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPet ? selectedPet.name : ""}
            onValueChange={handlePetSelection}
            style={styles.picker}
          >
            <Picker.Item label="Select a pet" value="" />
            {pets.map((pet) => (
              <Picker.Item key={pet.name} label={pet.name} value={pet.name} />
            ))}
          </Picker>
        </View>
        {selectedPet && (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{selectedPet.name}</Title>
              <Paragraph>Type: {selectedPet.type}</Paragraph>
              <Paragraph>Breed: {selectedPet.breed}</Paragraph>
              <Paragraph>Weight: {selectedPet.weight}</Paragraph>
              <Paragraph>Color: {selectedPet.color}</Paragraph>
            </Card.Content>
          </Card>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    color: "black",
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  picker: {
    height: 50,
  },
  card: {
    marginTop: 20,
    borderRadius: 8,
    elevation: 2,
  },
});

export default Index;
