import React from "react";
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from "react-native-modals";
import { Text } from "react-native";

function StudentInformation({
  foundVisible,
  setFoundVisible,
  apiData,
  textCedula,
  studentData,
  navigation,
}) {
  return (
    <Modal
      visible={foundVisible}
      modalAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: false,
        })
      }
      modalTitle={(
        <ModalTitle
          style={{ backgroundColor: "#2b2b2b" }}
          textStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
          title="Estudiante encontrado"
        />
      )}
      footer={(
        <ModalFooter style={{ backgroundColor: "#2b2b2b" }}>
          <ModalButton
            style={{ backgroundColor: "#2b2b2b" }}
            textStyle={{ color: "#D22B2B" }}
            text="Cancelar"
            onPress={() => setFoundVisible(false)}
          />
          <ModalButton
            style={{ backgroundColor: "#2b2b2b" }}
            textStyle={{ color: "#31AA84" }}
            text="Continuar"
            onPress={() => {
              setFoundVisible(false);
              navigation.navigate("Notas", {
                name: `${studentData.nombres} ${studentData.apellidos}`,
                data: apiData,
                cedula: textCedula,
              });
            }}
          />
        </ModalFooter>
      )}
    >
      <ModalContent style={{ backgroundColor: "#2b2b2b" }}>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            backgroundColor: "#2b2b2b",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Nombres:</Text>
          {" "}
          {studentData.apellidos}
          {" "}
          {studentData.nombres}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Carrera:
          </Text>
          {" "}
          {studentData.carrera}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sede:</Text>
          {" "}
          {studentData.sede}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Facultad:
          </Text>
          {" "}
          {studentData.facultad}
        </Text>
      </ModalContent>
    </Modal>
  );
}

export default StudentInformation;
