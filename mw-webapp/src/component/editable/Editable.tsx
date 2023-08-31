// Editable.js
import React, {useState} from "react";

// eslint-disable-next-line max-len
// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types, @typescript-eslint/no-explicit-any
export const Editable = ({text, type, placeholder, children, ...props}: any) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
// Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState(false);

  // Event handler while pressing any key while editing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    // Handle when key is pressed
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};