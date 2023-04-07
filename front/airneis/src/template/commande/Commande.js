import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import Cart from './Cart';
import DeliveryAddress from './DeliveryAddress';
import Payment from './Payment';
import ProductList from "../../products/ProductList";

const steps = ['Panier', 'Adresse de livraison', 'Paiement'];

function getStepContent(step, setCompletedSteps) {
  switch (step) {
    case 0:
      return <Cart setCompletedSteps={setCompletedSteps} />;
    case 1:
      return <DeliveryAddress setCompletedSteps={setCompletedSteps} />;
    case 2:
      return <Payment />;
    default:
      return <ProductList />;
  }
}

function StepperExample() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompletedSteps([]);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const isStepCompleted = (step) => {
    return completedSteps.includes(step);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepCompleted(index)) {
            labelProps.optional = <Button onClick={handleReset}> ..</Button>;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} onClick={handleStep(index)}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <p>All steps completed - you&apos;re finished</p>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>
          {getStepContent(activeStep, setCompletedSteps)}
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Retour
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepperExample;
