import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import { Formik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-gesture-handler";
import * as api from "../../api/Auth";
import { useAuth } from "../../modules/context/Auth";

import CTA from "../../components/authentication/CTA";
import { Colors, Typography } from "../../constants/styles";
import { AUTH_STYLES } from "../../constants/styles/auth";
import AppButton from "../../components/common/AppButton";

export default function Login(props) {
  const { navigation } = props;

  // 1 - DECLARE VARIABLES
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();

  async function onSubmit(state) {
    setLoading(true);

    try {
      const response = await api.login(state);
      await handleLogin(response);

      setLoading(false);

      navigation.replace("Home");
    } catch (err) {
      Alert.alert("Błąd", "Nie udało się zalgować", err.message);
      console.warn(err.message);
      setLoading(false);
    }
  }

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Adres email nie jest poprawny")
      .required("Musisz podać email!"),
    password: yup.string().required("Musisz podać hasło!"),
  });
  const { bypass } = useAuth();

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Logowanie</Text>
        <View style={styles.inputs}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({
              handleChange,
              values,
              handleBlur,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            }) => (
              <View>
                <TextInput
                  style={AUTH_STYLES.inputs}
                  placeholder="Adres e-mail"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <Text style={styles.alertFields}>
                  {" "}
                  {touched.email && errors.email}
                </Text>
                <TextInput
                  secureTextEntry
                  style={AUTH_STYLES.inputs}
                  placeholder="Hasło"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Text style={styles.alertFields}>
                  {" "}
                  {touched.password && errors.password}
                </Text>
                <CTA
                  ctaText="Zapomniałeś hasła ?"
                  onPress={() => navigation.navigate("ForgotPassword")}
                  style={styles.ctaFooter}
                  ctaStyle={styles.cta}
                />
                <AppButton
                  buttonStyle={styles.loginButton}
                  fontForgeIconStyle={styles.iconButton}
                  size={150}
                  icon="log_in"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                />
                <ActivityIndicator animating={loading} />
              </View>
            )}
          </Formik>

          <CTA
            title="Nie masz konta ?"
            ctaText="Zarejestruj"
            onPress={() => navigation.replace("Register")}
            style={styles.register}
          />
          {process.env.NODE_ENV === "development" && (
            <CTA ctaText="bypass" onPress={bypass} style={styles.register} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_VERY_LIGHT,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomColor: Colors.PURPLE,
    paddingTop: 16,
    justifyContent: "center",
  },
  ctaFooter: {
    justifyContent: "flex-start",
  },
  cta: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_12,
    marginHorizontal: 8,
  },
  register: {
    marginTop: 25,
  },
  inputs: {
    flex: 1,
    marginHorizontal: 50,
  },
  alertFields: {
    color: "red",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    marginLeft: 85,
  },
  iconButton: {
    alignSelf: "center",
    marginTop: 0,
    marginRight: 0,
    marginVertical: -100,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.PURPLE,
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    color: Colors.PURPLE,
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

Login.navigationOptions = () => {
  return {
    title: ``,
  };
};
