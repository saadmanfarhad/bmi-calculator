import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './Calculator.css';
import Input from '../../components/UI/Input/Input';

class Calculator extends Component {
    state = {
        calculatorForm: {
            height: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Height in cm'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            weight: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Weight in kg'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
        height: 0,
        weight: 0,
        resultString: '',
        formIsValid: false
    }

    calculatorHandler = ( event ) => {
        event.preventDefault();
        // const formData = {};
        // for (let formElementIdentifier in this.state.calculatorForm) {
        //     formData[formElementIdentifier] = this.state.calculatorForm[formElementIdentifier].value;
        // }
        const heightSquare = (this.state.height) * (this.state.height);
        const bmiValue = (this.state.weight) / heightSquare;
        console.log(this.state.weight);
        console.log(heightSquare);
        console.log(bmiValue);

        let updatedResultString = '';

        if(bmiValue < 18.5){
          updatedResultString = 'Underweight';
        }
        else if(bmiValue < 24.9){
          updatedResultString = 'Normal';
        }
        else if(bmiValue < 29.9){
          updatedResultString = 'Overweight';
        }
        else if(bmiValue < 39.9){
          updatedResultString = 'Medically Obese';
        }
        else{
          updatedResultString = 'Extremely Obese'
        }

        this.setState({resultString: updatedResultString});

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCalcatorForm = {
            ...this.state.calculatorForm
        };
        const updatedFormElement = {
            ...updatedCalcatorForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedCalcatorForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCalcatorForm) {
            formIsValid = updatedCalcatorForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({calculatorForm: updatedCalcatorForm, formIsValid: formIsValid,
          height: (+updatedCalcatorForm['height'].value/100), weight: +updatedCalcatorForm['weight'].value
        });
    }

    resetCalculator = (inputIdentifier) =>{
      const updatedCalcatorForm = {
          ...this.state.calculatorForm
      };

      const updatedHeightFormElement = {
          ...updatedCalcatorForm['height']
      };

      const updatedWeightFormElement = {
        ...updatedCalcatorForm['weight']
      }

      updatedHeightFormElement.value = '';
      updatedWeightFormElement.value = '';
      // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      // updatedFormElement.touched = true;

      updatedCalcatorForm['weight'] = updatedWeightFormElement;
      updatedCalcatorForm['height'] = updatedHeightFormElement;

      this.setState({calculatorForm: updatedCalcatorForm, resultString: '', height: '', weight: '', formIsValid: false});
      // console.log(this.state.calculatorForm['height'].value);
      //this.setState({calculatorForm['height'].value: ''});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.calculatorForm) {
            formElementsArray.push({
                id: key,
                config: this.state.calculatorForm[key]
            });
        }
        let form = (
          <div>
            <form onSubmit={this.calculatorHandler}>
              {formElementsArray.map(formElement => (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)} />
              ))}
              <Button btnType="Success" disabled={!this.state.formIsValid}>Calculate</Button>
            </form>
            <Button btnType="Danger" disabled={!this.state.formIsValid} clicked={this.resetCalculator}>Reset</Button>
          </div>
        );

        let outputString = (
          <h3>{this.state.resultString}</h3>
        );

        const style = {
          color: '#FF0000'
        };

        if(this.state.resultString === 'Medically Obese' || this.state.resultString === 'Overweight' || this.state.resultString === 'Extremely Obese'){
          outputString = (
            <h3 style={style}>{this.state.resultString}</h3>
          );
        }
        return (
            <div className={classes.Calculator}>
              <h1>BMI Calculator</h1>
              {form}
              {outputString}
            </div>
        );
    }
}

export default Calculator;
