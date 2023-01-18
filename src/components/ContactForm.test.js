import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";


describe('Test: CF comp exists?', () => {
    //make sure comp is in virtual dom
    test('Renders CF comp without errors', () => {
        render(<ContactForm/>);
    })

    test('Renders contact form header', () => {
        //Arrange
        render(<ContactForm/>);

        //Act
        //query/get each input
        const headerElement = screen.queryByText(/contact form/i);
            // console.log(headerElement);
    
        //Assert
        //test that the form input exists on page
            //3 things to test - in doc, t/f, have specific text
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toBeTruthy();
        expect(headerElement).toHaveTextContent(/contact form/i);
    })


    test('Renders ONE error message if user enters less than 5 characters into the firstname field', async () => {
        render(<ContactForm/>);

        //grab input that we want to test
        const firstNameField = screen.getByLabelText(/first name*/i);
        //trigger state change by adding text
        userEvent.type(firstNameField, "123");
        //account for promise. by test id so we dont
        const errorMessages = await screen.findAllByTestId('error');
        // console.log(errorMessages);
        expect(errorMessages).toHaveLength(1);

        //test will pass bc we get 1 error message back 
    });


    test('renders 3 error message if user enters no values into any fields', async () => {
        //if we press submit without putting in info
        render(<ContactForm/>);

        const submitButton = screen.getByRole("button");
        userEvent.click(submitButton);

        //state change happens here too when you submit form - use async/await or waitFor - t/f
        await waitFor(()=> {
            const errorMessages = screen.queryAllByTestId('error');
            // console.log(errorMessages);
            expect(errorMessages).toHaveLength(3);
        });
    });


    test('render 1 error message if user enters valid first and last name BUT no email', async () => {
        //partial validation
        render(<ContactForm/>);

        //two fields to enter text into - make 2 variables to grab the input boxes -- then put elements inside each field
        const firstNameField = screen.getByLabelText(/first name*/i);
        userEvent.type(firstNameField, 'Hello');
        const lastNameField = screen.getByLabelText(/last name*/i);
        userEvent.type(lastNameField, 'Victoria');
        
        //make sure errors show - put in name only ^ then submit - grab button and click
        const button = screen.getByRole('button');
        userEvent.click(button);

        //get error msgs and wait for response - async/await here. expect 1 error msg from not inputting email
        const errorMessages = await screen.findAllByTestId('error');
        expect(errorMessages).toHaveLength(1);
    });

    test('renders "email must be a valid email address" if an invalid email is entered', async () => {
        //error shows up as soon as you start typing
        render(<ContactForm/>);
        //grab email
        const emailField = screen.getByLabelText(/email*/i);
        // console.log(emailField);
        //type in something that's not valid
        userEvent.type(emailField, 'hi');

        //get error msg. await bc state change
        const errorMessage = await screen.findByText(/email must be a valid email address/i);
        //make sure error message shows up
        expect(errorMessage).toBeInTheDocument();
    })

    test('renders "lastName is a required field" if last name is not entered and submit button is clicked', async ()=> {
        render(<ContactForm/>);

        //grab button and click it
        const submitButton = screen.getByRole('button');
        userEvent.click(submitButton);

        //what error message you want to show. await. expect.
        const errorMessage = await screen.findByText(/lastName is a required field/i);
        expect(errorMessage).toBeInTheDocument();

        //in this ex, he just grabbed the button and did the same error message code
    })

    test('renders all firstName, lastName and email text when submitted. does NOT render message if message is not submitted', async()=>{
        //so need to do some negative test here
        render(<ContactForm/>);

        //grab inputs and type valid text inside
        const firstName = screen.getByLabelText(/first name*/i);
        userEvent.type(firstName, 'Victoria');
        const lastName = screen.getByLabelText(/last name*/i);
        userEvent.type(lastName, 'hello')
        const emailField = screen.getByLabelText(/email*/i);
        userEvent.type(emailField, 'hi@gmail.com');

        //submit form
        const submitButton = screen.getByRole('button');
        userEvent.click(submitButton);

        //focus on state change -- 4 diff types of displays and asserts - await waitFor -- type into inputs
        await waitFor(()=>{
            const firstNameDisplay = screen.queryByText(/victoria/i);
            const lastNameDisplay = screen.queryByText(/hello/i)
            const emailDisplay = screen.queryByText('hi@gmail.com')
            const messageDisplay = screen.queryByText('message display');

            expect (firstNameDisplay).toBeInTheDocument();
            expect (lastNameDisplay).toBeInTheDocument();
            expect (emailDisplay).toBeInTheDocument();
            expect (messageDisplay).not.toBeInTheDocument();
        })
    })
  
    test('renders all fields text when all fields are submitted', async() => {
        render(<ContactForm/>);

        //grab inputs and type valid text inside
        const firstName = screen.getByLabelText(/first name*/i);
        userEvent.type(firstName, 'Victoria');
        const lastName = screen.getByLabelText(/last name*/i);
        userEvent.type(lastName, 'hello')
        const emailField = screen.getByLabelText(/email*/i);
        userEvent.type(emailField, 'hi@gmail.com');
        const messageField = screen.getByLabelText(/message/i);
        userEvent.type(messageField, 'here is a message');

        //submit form
        const submitButton = screen.getByRole('button');
        userEvent.click(submitButton);

        //focus on state change -- 4 diff types of displays and asserts - await waitFor -- type into inputs
        await waitFor(()=>{
            const firstNameDisplay = screen.queryByText(/victoria/i);
            const lastNameDisplay = screen.queryByText(/hello/i)
            const emailDisplay = screen.queryByText('hi@gmail.com')
            const messageDisplay = screen.queryByText('here is a message');

            expect (firstNameDisplay).toBeInTheDocument();
            expect (lastNameDisplay).toBeInTheDocument();
            expect (emailDisplay).toBeInTheDocument();
            expect (messageDisplay).toBeInTheDocument();
        })
    })
});