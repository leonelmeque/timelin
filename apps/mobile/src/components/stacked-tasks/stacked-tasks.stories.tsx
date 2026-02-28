import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "storybook/test";
import { StackedTasks } from "./index";
import { TodoStatus } from "~/lib/shared-types";

const mockTasks = [
  {
    id: "1",
    todo: "Build authentication module",
    description: "Implement login, signup and session management with Supabase",
    status: TodoStatus.ON_GOING,
    timestamp: new Date("2026-02-24").getTime(),
    deadline: new Date("2026-03-15").getTime(),
    timeline: [],
    subtasks: [],
  },
  {
    id: "2",
    todo: "Design landing page",
    description: "Create hero section, features grid, and CTA",
    status: TodoStatus.TODO,
    timestamp: new Date("2026-02-20").getTime(),
    timeline: [],
    subtasks: [],
  },
  {
    id: "3",
    todo: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: TodoStatus.COMPLETED,
    timestamp: new Date("2026-02-18").getTime(),
    timeline: [],
    subtasks: [],
  },
];

const meta: Meta<typeof StackedTasks> = {
  component: StackedTasks,
  title: "Components/StackedTasks",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tasks: mockTasks },
};

export const SingleTask: Story = {
  args: { tasks: [mockTasks[0]] },
};

export const Empty: Story = {
  args: { tasks: [] },
};

export const ExpandCard: Story = {
  args: { tasks: mockTasks },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First card should show title
    const firstCard = canvas.getByText("Build authentication module");
    await expect(firstCard).toBeVisible();

    // Click to expand
    await userEvent.click(firstCard);

    // Description should now be visible
    await expect(
      canvas.getByText(/Implement login, signup/)
    ).toBeVisible();

    // "Open task" button should appear
    await expect(canvas.getByText("Open task")).toBeVisible();
  },
};
