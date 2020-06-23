import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {Card, Form, FormGroup, Input, Label, Button} from 'reactstrap';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';

const SignIn = (props) => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    
    //handling changes
    const inputChange = e => {
        e.persist();
        const newForm = {
            ...form,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
    // validateChange(e);
    setForm(newForm);
    };

    const inputSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post("/auth/login", form)
            .then( res => {
                localStorage.setItem('token', res.data.token)
                props.history.push('./TechList')
                console.log(res); 
            });
    }

    return (
        <div>
        <Form className = 'Form'>
            <h1>Sign In</h1>
            <FormGroup className = 'FormGroup'>
                <legend>Username</legend>
                <Input className = 'Input' type="text" name="username" value={form.username} onChange={inputChange}/>
            </FormGroup>
            <FormGroup className = 'FormGroup'>
                <legend>Password</legend>
                <Input className = 'Input' type="password" name="password" value={form.password} onChange={inputChange}/>
            </FormGroup>
            <Button onSubmit={inputSubmit}>Sign In</Button>
        </Form>
        <Link to = '/sign-up'>
        Don't have an account? Sign up here.
        </Link>
        </div>
    );
};
export default SignIn;

