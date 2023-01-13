import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import ContactForm from "./ContactForm";


describe('Test: CF comp exists?', () => {
    test('Renders CF comp without errors', () => {
        render(<ContactForm/>);
    })

    test('user can fill out and submit form', () => {
        //Arrange
            //render out component
        render(<ContactForm/>);
        //Act
            //query each input
        const firstNameInput = screen.getByLabelText(/first name*/i)
        const lastNameInput = screen.getByLabelText(/last name*/i)
        const emailInput = screen.getByLabelText(/email*/i)
        const messageInput = screen.getByLabelText(/message/i)
            // // put a value for each input

        // fireEvent.change(firstNameInput)


            //fill out form elements
            //click button
        //Assert
            //test that form input exists on page
    })
})