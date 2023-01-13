import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";


describe('Test: CF comp exists?', () => {
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
        //test that form input exists on page
            //3 things to test - in doc, t/f, have specific text
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toBeTruthy();
        expect(headerElement).toHaveTextContent(/contact form/i);
    })

    test('Renders ONE error message if user enters more than 3 characters into the firstname field', async () => {
        render(<ContactForm/>);

        const firstNameField = screen.getByPlaceholderText('Edd');
        //trigger state change by adding text
        await userEvent.type(firstNameField, "1234");
        //account for promise. by test id so we dont
        const errorMessages = await screen.findAllByTestId('error');
        // console.log(errorMessages);
        expect(errorMessages).toHaveLength(1);
    });



})











    //     const lastNameInput = screen.getByLabelText(/last name*/i)
    //     const emailInput = screen.getByLabelText(/email*/i)
    //     const messageInput = screen.getByLabelText(/message/i)
            // // put a value for each input

        // fireEvent.change(firstNameInput)


            //fill out form elements
            //click button
    