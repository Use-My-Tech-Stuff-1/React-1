import React, { useState, useEffect } from 'react';
import {Card, Form, FormGroup, Input, Label, Button} from 'reactstrap';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';


const SignUp = () => {

    //state for the submit button: disables button by default (until validation)
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [users, setUsers] = useState();

    //state for the form's default state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    });

    //creating a state for any errors
    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        password: '',
        terms: ''
    });

    const formSchema = yup.object().shape({
        userName: yup.string().required('Please enter name'),
        email: yup 
            .string()
            .email('Must be a valid email address')
            .required('Please enter email address'),
        password: yup.string().required('Password is required'),
        terms: yup.boolean().oneOf([true], 'Please accept terms')
    });

    //enables button if formData is valid in according to formSchema
    useEffect(() => {
        formSchema.isValid(formData).then(formValidation => {
            console.log('is form valid?', formValidation)
            setButtonDisabled(!formValidation);
        })
    }, [formData]);

    //setting the error state to whatever error formSchema finds in a given input
    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ''
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    //handling changes
    const inputChange = e => {
        e.persist();

        let checkBox = true;

        if(e.target.name === 'terms') {
            checkBox = e.target.checked;
        } else {
            checkBox = formData.terms;
        }

        const newFormInput = {
            ...formData,
            terms: checkBox,
            [e.target.name]: 
                e.target.name === 'terms' ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormData(newFormInput);
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(showPassword ? false : true)
    }

    //placeholder api so I can see some data.
    const formSubmit = e => {
        e.preventDefault();
        console.log('default', e)

        axios
        .post('https://usemy-techstuff.herokuapp.com/api/auth/register', formData)
        .then(res => {
            setUsers(res.data);
            console.log('SET POST', res.data);

            setFormData({
                name: '',
                email: '',
                password: ''
            });

            // setServerError(null);
        })
        .catch(err => {
            console.log('server error', err);
            // setServerError('SERVER ERROR')
        })
    }

    return (

        <Form className = 'Form' onSubmit={formSubmit}>
        <Card>
            <h1 className = 'h1' >Sign Up</h1>
        </Card>

        <FormGroup className = 'FormGroup'>

            <FormGroup className = 'FormGroup'>
                <legend>Username</legend>
                <Input className = 'Input' type='text' name='userName' value={formData.userName} onChange={inputChange}/>
                {errors.userName.length > 0 ? <p className="error">{errors.userName}</p> : null}
            </FormGroup>

            <FormGroup className = 'FormGroup'>
                <legend>Email</legend>
                <Input className = 'Input' type='text' name='email' value={formData.email} onChange={inputChange}/>
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            </FormGroup>

            <FormGroup className = 'FormGroup'>
                <legend>Password</legend>
                <Input className = 'Input' type={showPassword ? "text" : "password"} name='password' onChange={inputChange}/>
                 {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
            </FormGroup>

            <FormGroup className = 'FormGroup-Check' tag='fieldset'>

                <FormGroup className = 'checkbox' check>
                        <Label check>
                            <Input type="checkbox" id="togglePassword" onClick = {togglePassword} /> 
                            <span style = {{margin: '-5px 0'}}>Show password</span>
                        </Label>
                    </FormGroup>

                <FormGroup className = 'checkbox' check>
                    <Label check>
                        <Input type='checkbox' data-cy='checkbox2' name='terms' checked={formData.terms} onChange={inputChange}/>
                        Terms and Conditions
                    </Label>
                    {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
                </FormGroup>

            </FormGroup>
            <div style = {{textAlign: 'center'}}>
            <Button disabled={buttonDisabled}>Create your Account</Button>
            </div>
           

        </FormGroup>
        </Form>

    );
};

export default SignUp;