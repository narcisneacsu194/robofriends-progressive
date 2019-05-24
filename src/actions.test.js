import * as actions from "./actions";
import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from "./constants";

import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import fetchMock from "fetch-mock";

const mockStore = configureMockStore([thunkMiddleware]);

it("should create an action to search robots", () => {
  const text = "wooo";
  const expectedAction = {
    type: CHANGE_SEARCH_FIELD,
    payload: text
  };
  expect(actions.setSearchField(text)).toEqual(expectedAction);
});

it("handles REQUEST_ROBOTS_PENDING", () => {
  const store = mockStore();
  store.dispatch(actions.requestRobots());
  const action = store.getActions()[0];
  const expectedAction = {
    type: REQUEST_ROBOTS_PENDING
  };
  expect(action).toEqual(expectedAction);
});

it("handles REQUEST_ROBOTS_SUCCESS", () => {
  fetchMock
    .getOnce("https://jsonplaceholder.typicode.com/users", {
      body: {
        users: [
          {
            id: 1,
            name: "user1",
            email: "user1@gmail.com"
          },
          {
            id: 2,
            name: "user2",
            email: "user2@gmail.com"
          }
        ]
      },
      headers: {
        "content-type": "application-json"
      }
    })
    .catch(() => {});

  const expectedActions = [
    { type: REQUEST_ROBOTS_PENDING },
    {
      type: REQUEST_ROBOTS_SUCCESS,
      payload: {
        users: [
          {
            id: 1,
            name: "user1",
            email: "user1@gmail.com"
          },
          {
            id: 2,
            name: "user2",
            email: "user2@gmail.com"
          }
        ]
      }
    }
  ];

  const store = mockStore();
  return store.dispatch(actions.requestRobots()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it("handles REQUEST_ROBOTS_FAILED", () => {
  fetchMock
    .getOnce("https://jsonplaceholder.typicode.com/userss", {
      body: {
        users: [
          {
            id: 1,
            name: "user1",
            email: "user1@gmail.com"
          },
          {
            id: 2,
            name: "user2",
            email: "user2@gmail.com"
          }
        ]
      },
      headers: {
        "content-type": "application-json"
      }
    })
    .catch(() => {});

  const expectedActions = [
    { type: REQUEST_ROBOTS_PENDING },
    {
      type: REQUEST_ROBOTS_FAILED
    }
  ];

  const store = mockStore();
  return store.dispatch(actions.requestRobots()).then(() => {
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
    expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
  });
});
