import {useState} from "react";
import type {StoryFn} from "@storybook/react";
import {Button} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";

const meta = {
  title: "Modal",
  component: Modal,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

const defaultContent = (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
  </div>
);

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button
        value="Click me!"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        content={defaultContent}
        isOpen={isOpen}
        text="Okey"
        onOk={() => setIsOpen(false)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {isOpen: false};

export const Opened = Template.bind({});
Opened.args = {isOpen: true};
