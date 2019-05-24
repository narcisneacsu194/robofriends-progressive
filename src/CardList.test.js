import { shallow } from "enzyme";
import React from "react";
import CardList from "./CardList";

it("should render the CardList component", () => {
  const mockRobots = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe1",
      email: "johndoe@gmail.com"
    }
  ];

  expect(shallow(<CardList robots={mockRobots} />).length).toEqual(1);
});
