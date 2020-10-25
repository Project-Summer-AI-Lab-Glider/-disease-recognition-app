import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";
import DiagnosisQuestionItem from "./QuestionItem";
import TextButton from "../common/TextButton";

// TODO: ADD form validation - Maybe formik would be better here
const DiagnosisForm = ({ questions, setAnswerByIndex, onSubmit }) => {
  return (
    <FlatList
      data={questions}
      keyExtractor={(question) => question.content}
      renderItem={({ item, index }) => (
        <DiagnosisQuestionItem
          question={item}
          setAnswer={(answer) => {
            setAnswerByIndex(index, answer);
          }}
        />
      )}
      ListFooterComponentStyle={{ marginTop: 20 }}
      ListFooterComponent={
        <TextButton onPress={onSubmit} text="Sprawdź odpowiedzi" />
      }
    />
  );
};

DiagnosisForm.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAnswerByIndex: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DiagnosisForm;
