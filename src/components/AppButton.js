import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import FontForgeIcon from "./FontForgeIcon";

import { Colors } from "../constants/styles";

const AppButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontForgeIcon
        name={icon}
        size={80}
        color={Colors.PURPLE}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 17,
    marginRight: 17,
  },
});

AppButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AppButton;
