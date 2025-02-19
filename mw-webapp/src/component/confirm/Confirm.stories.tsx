import {useState} from "react";
import type {StoryFn} from "@storybook/react";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";

const meta = {
  title: "Confirm",
  component: Confirm,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

const defaultContent = (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
  </div>
);

const Template: StoryFn<typeof Confirm> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <Confirm
      trigger={
        <Button
          value="Click me!"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      }
      content={defaultContent}
      isOpen={isOpen}
      onOk={() => {}}
      okText="Ok"
      cancelText="Cancel"
    />
  );
};

export const Default = Template.bind({});
Default.args = {isOpen: false};

export const Opened = Template.bind({});
Opened.args = {isOpen: true};
