import React from "react";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Text } from "react-native";

const StudentInformation = ({
  foundVisible,
  setFoundVisible,
  apiData,
  textCedula,
  studentData,
  navigation,
}) => {
  return (
    <Dialog
      visible={foundVisible}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        })
      }
      dialogTitle={
        <DialogTitle
          style={{ backgroundColor: "#2b2b2b" }}
          textStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
          title="Estudiante encontrado"
        />
      }
      footer={
        <DialogFooter style={{ backgroundColor: "#2b2b2b" }}>
          <DialogButton
            style={{ backgroundColor: "#2b2b2b" }}
            textStyle={{ color: "#D22B2B" }}
            text="Cancelar"
            onPress={() => setFoundVisible(false)}
          />
          <DialogButton
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
        </DialogFooter>
      }
    >
      <DialogContent style={{ backgroundColor: "#2b2b2b" }}>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            backgroundColor: "#2b2b2b",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Nombres:</Text>{" "}
          {studentData.apellidos} {studentData.nombres}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Carrera:
          </Text>{" "}
          {studentData.carrera}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sede:</Text>{" "}
          {studentData.sede}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Facultad:
          </Text>{" "}
          {studentData.facultad}
        </Text>
      </DialogContent>
    </Dialog>
  );
};

export default StudentInformation;
