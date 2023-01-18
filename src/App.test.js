import React from "react";
import {render, screen } from "@testing-library/react";
import App from "./App";

describe('Test: App Exists?', () => {
    test('Renders App comp without errors', () => {
        render(<App/>);
    })
});

