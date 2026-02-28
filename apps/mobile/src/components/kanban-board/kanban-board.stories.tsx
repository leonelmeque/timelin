import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "storybook/test";
import { KanbanBoard } from "./index";
import { TodoStatus } from "~/lib/shared-types";

const mockTasks = [
  {
    id: "1",
    todo: "Build authentication module",
    description: "Implement login and signup",
    status: TodoStatus.ON_GOING,
    timestamp: new Date("2026-02-24").getTime(),
    timeline: [],
    subtasks: [],
  },
  {
    id: "2",
    todo: "Design landing page",
    description: "Hero section and CTA",
    status: TodoStatus.TODO,
    timestamp: new Date("2026-02-20").getTime(),
    timeline: [],
    subtasks: [],
  },
  {
    id: "3",
    todo: "Fix login redirect bug",
    description: "Navigation crashes after sign-in",
    status: TodoStatus.TODO,
    timestamp: new Date("2026-02-22").getTime(),
    timeline: [],
    subtasks: [],
  },
  {
    id: "4",
    todo: "Set up CI/CD pipeline",
    description: "GitHub Actions for testing",
    status: TodoStatus.COMPLETED,
    timestamp: new Date("2026-02-18").getTime(),
    timeline: [],
    subtasks: [],
  },
  {
    id: "5",
    todo: "Write API docs",
    description: "Document REST endpoints",
    status: TodoStatus.ON_HOLD,
    timestamp: new Date("2026-02-19").getTime(),
    timeline: [],
    subtasks: [],
  },
];

const meta: Meta<typeof KanbanBoard> = {
  component: KanbanBoard,
  title: "Components/KanbanBoard",
  decorators: [
    (Story) => (
      <div style={{ padding: 16, backgroundColor: "#121212", minHeight: 400 }}>
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

export const Empty: Story = {
  args: { tasks: [] },
};

export const SingleColumn: Story = {
  args: {
    tasks: mockTasks.filter((t) => t.status === TodoStatus.TODO),
  },
};

export const ExpandCard: Story = {
  args: { tasks: mockTasks },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Card title should be visible
    const card = canvas.getByText("Build authentication module");
    await expect(card).toBeVisible();

    // Click to expand
    await userEvent.click(card);

    // Description should now be visible
    await expect(
      canvas.getByText(/Implement login and signup/)
    ).toBeVisible();

    // "Open" button should appear
    await expect(canvas.getByText("Open")).toBeVisible();
  },
};
