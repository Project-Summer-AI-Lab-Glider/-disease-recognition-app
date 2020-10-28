import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { Colors, Typography } from "../../constants/styles";
import { modulePropTypes } from "../../constants/propTypes/diagnosis";

const DiagnosisContainer = ({ children, module, subTitle }) => {
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.container}>
        {module && (
          <>
            <Text style={styles.moduleName}>{module.name}</Text>
          </>
        )}
        {!!subTitle && (
          <>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </>
        )}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.PURPLE,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_VERY_LIGHT,
    borderTopRightRadius: 50,
    paddingTop: 20,
    justifyContent: "center",
    padding: 20,
  },
  moduleName: {
    textTransform: "uppercase",
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.PURPLE,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  subTitle: {
    color: Colors.PURPLE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

DiagnosisContainer.defaultProps = {
  module: null,
  subTitle: "",
};

DiagnosisContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  module: modulePropTypes,
  subTitle: PropTypes.string,
};

export default DiagnosisContainer;
