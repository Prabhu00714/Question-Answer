import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const vattaQuestions = [
  {
    question: "Krish: Are you thin or skinny?",
    options: ["Normal (+1)", "Abnormal (very lean or fluctuating)"],
  },
  {
    question: "Vak Pravritti: Being able to speak properly",
    options: [
      "Normal (+1)",
      "Abnormal (speaking too much, too little, or not at the right time)",
    ],
  },
  // Add other Vatta questions similarly
];

const pittaQuestions = [
  {
    question: "Dhristi: How is your vision",
    options: [
      "Normal (+1)",
      "Abnormal (extremely sharp/bright, extremely unsharp/bright, blinking too much/little)",
    ],
  },
  {
    question: "Budhi: How is your Intellect",
    options: [
      "Normal (+1) (knowing what is good or bad; good decision-making abilities)",
      "Abnormal (overthinking or poor decision-making)",
    ],
  },
  // Add other Pitta questions similarly
];

const kaphaQuestions = [
  {
    question: "San tarpan: Are you bulky",
    options: ["Normal (+1)", "Abnormal"],
  },
  {
    question: "Bala: Do you have good strength",
    options: ["Normal (+1)", "Abnormal"],
  },
  // Add other Kapha questions similarly
];

function CustomStepPanel(props) {
  const { children, activeStep, index, ...other } = props;

  return (
    <div hidden={activeStep !== index} {...other}>
      {activeStep === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomStepPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default function BasicStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderQuestions = (questions) => {
    return questions.map((q, index) => (
      <div key={index}>
        <Typography variant="h6">{q.question}</Typography>
        {q.options.map((option, i) => (
          <div key={i}>
            <input
              type="radio"
              id={`q${index}_o${i}`}
              name={`question_${index}`}
              value={option}
            />
            <label htmlFor={`q${index}_o${i}`}>{option}</label>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key="Vatta">
          <StepLabel>Vatta</StepLabel>
        </Step>
        <Step key="Pitta">
          <StepLabel>Pitta</StepLabel>
        </Step>
        <Step key="Kapha">
          <StepLabel>Kapha</StepLabel>
        </Step>
      </Stepper>
      <CustomStepPanel activeStep={activeStep} index={0}>
        {renderQuestions(vattaQuestions)}
      </CustomStepPanel>
      <CustomStepPanel activeStep={activeStep} index={1}>
        {renderQuestions(pittaQuestions)}
      </CustomStepPanel>
      <CustomStepPanel activeStep={activeStep} index={2}>
        {renderQuestions(kaphaQuestions)}
      </CustomStepPanel>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </Box>
  );
}
