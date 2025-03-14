import { thunk } from "redux-thunk";
import { userData } from "../../utils/mocks";
import { login, logout, register } from "../actions/user";
import user, { setAuthChecked, setUser } from "./user";
import createMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
const initialState = {
  user: null,
  isAuthChecked: false,
  isForgotSend: false,
};

describe("User reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should return the initial state", () => {
    expect(user(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set auth checked", () => {
    expect(
      user(
        { isAuthChecked: false },
        {
          type: setAuthChecked.type,
          payload: true,
        }
      ).isAuthChecked
    ).toEqual(true);
  });

  it("should set user", () => {
    expect(
      user(
        { user: null },
        {
          type: setUser.type,
          payload: userData,
        }
      ).user
    ).toEqual(userData);
  });

  it("should login", async () => {
    const store = mockStore(initialState);

    fetchMock.postOnce("*", {
      user: { name: userData[0].name, email: userData[0].email },
      accessToken: "abc",
      refreshToken: "abcd",
    });

    await store
      .dispatch(
        login({ email: userData[0].email, password: userData[0].password })
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(login.pending.type);
        expect(actions[1].type).toBe(login.fulfilled.type);
        expect(actions[1].payload).toEqual({
          name: userData[0].name,
          email: userData[0].email,
        });
      });
  });

  it("should register", async () => {
    const store = mockStore(initialState);

    fetchMock.postOnce("*", {
      user: {
        name: userData[1].name,
        email: userData[1].email,
      },
      accessToken: "abc",
      refreshToken: "abcd",
    });

    await store.dispatch(register(userData[1])).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe(register.pending.type);
      expect(actions[1].type).toBe(register.fulfilled.type);
      expect(actions[1].payload).toEqual({
        name: userData[1].name,
        email: userData[1].email,
      });
    });
  });

  it("should logout", async () => {
    const store = mockStore(initialState);

    fetchMock.postOnce("*", true);

    await store.dispatch(logout()).then(() => {
      const state = store.getState();
      expect(state.user).toEqual(null);
    });
  });
});
