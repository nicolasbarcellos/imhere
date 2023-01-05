import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./style";

export function Home() {
  const [participantName, setParticipantName] = useState("");
  const [participantList, setParticipantList] = useState<string[]>([]);

  function handleParticipantAdd(name: string) {
    if (!participantName.length) return;
    if (participantList.includes(name)) {
      return Alert.alert(
        "Participante existente",
        "Já existe um participante na lista com esse nome."
      );
    }
    setParticipantList((prevParticipants) => [
      ...prevParticipants,
      participantName,
    ]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          const newParticipantList = participantList.filter(
            (item) => item !== name
          );
          setParticipantList(newParticipantList);
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          defaultValue={participantName}
          style={styles.input}
          onChangeText={(newParticipant) => setParticipantName(newParticipant)}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleParticipantAdd(participantName)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
        data={participantList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
      />
    </View>
  );
}
