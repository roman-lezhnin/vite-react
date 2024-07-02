import type { Meta, StoryObj } from "@storybook/react";
import { FieldError } from "./";

type Story = StoryObj<typeof FieldError>;

const meta: Meta<typeof FieldError> = {
  title: "Components/FieldError",
  component: FieldError,
};

export default meta;

export const Default: Story = {
  args: {
    apiError: "INVALID_PASSWORD",
    formError: "Weak password",
  },
};

export const ApiError: Story = {
  args: {
    apiError: "INVALID_LOGIN",
  },
};

export const FormError: Story = {
  args: {
    formError: "Invalid login",
  },
};

export const Empty: Story = {
  args: {},
};
