// Jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// Expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {configure} from "@testing-library/react";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure vitest to use data-cy attribute
configure({testIdAttribute: "data-cy"});
