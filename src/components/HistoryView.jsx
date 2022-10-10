import React from "react";
import Timeline from "react-native-timeline-flatlist";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});

function HistoryView({ data }) {
  if (data) {
    return (
      <ScrollView
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Timeline
          data={data}
          circleSize={20}
          circleColor="#128f76"
          lineColor="#18bc9c"
          titleStyle={{
            color: "white",
          }}
          descriptionStyle={{ color: "gray" }}
          timeStyle={{ color: "gray" }}
          timeContainerStyle={{
            minWidth: 60,
            marginTop: -5,
            marginLeft: -5,
          }}
          innerCircle="dot"
        />
      </ScrollView>
    );
  }
  return null;
}

export default HistoryView;
