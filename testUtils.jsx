import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const AllTheProviders = ({ children }) => {
    return (
        <React.Fragment>
            {/* Can add in translation providers or global store here */}
            {children}
        </React.Fragment>
    );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
