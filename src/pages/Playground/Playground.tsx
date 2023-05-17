import {
  createContext,
  useContext,
  useRef,
  useState,
  PropsWithChildren,
} from "react";
import { Box, Checkbox, styled } from "@mui/material";
import { IAppContext, User } from "../../components/AppContext/AppContext";

const MainContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Row = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
}));

interface ToDo {
  text: undefined | string;
  done: undefined | boolean;
}

const Playground = () => {
  return (
    <MainContainer>
      <h1>Playground</h1>
      <Row>
        <UserContextProvider>
          <h3>User context</h3>
          <Row>
            <SignIn />
            <UserPage />
          </Row>
        </UserContextProvider>

        <ToDosContextProvider>
          <h3>ToDos Context</h3>
          <ToDosInput />
          <ToDosContainer />
        </ToDosContextProvider>
      </Row>
      <p>Something outside of any context</p>
    </MainContainer>
  );
};

const UserContext = createContext({} as IAppContext);
//const UserContext = createContext({ name: "", email: "" });
const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IAppContext>();
  return (
    <UserContext.Provider value={{ user, setUser } as IAppContext}>
      <MainContainer sx={{ backgroundColor: "whitesmoke" }}>
        {children}
      </MainContainer>
    </UserContext.Provider>
  );
};

interface IToDosContext {
  toDos: ToDo[];
  addTodo: (toDo: ToDo) => void;
  sortToDos: (todo: ToDo) => void;
}

const ToDosContext = createContext<IToDosContext>({} as IToDosContext);
const ToDosContextProvider = ({ children }: PropsWithChildren) => {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  const addTodo = (toDo: ToDo) => {
    setToDos((toDos) => [toDo, ...toDos]);
  };

  const sortToDos = (todo: ToDo) => {
    setToDos((toDos) => {
      const filteredToDos = toDos.filter((el) => el.text !== todo.text);
      if (!todo.done) {
        return [todo, ...filteredToDos];
      } else {
        return [
          ...filteredToDos.filter((el) => !el.done),
          todo,
          ...filteredToDos.filter((el) => el.done),
        ];
      }
    });
  };

  return (
    <ToDosContext.Provider value={{ toDos, addTodo, sortToDos }}>
      <MainContainer sx={{ backgroundColor: "bisque" }}>
        {children}
      </MainContainer>
    </ToDosContext.Provider>
  );
};

const ToDosInput = () => {
  const { addTodo } = useContext(ToDosContext);
  const inputRef = useRef<any>();

  const handleAddToDo = () => {
    const value = inputRef?.current?.value?.trim();
    if (!value) {
      alert("Add ToDo text");
      return;
    }
    addTodo({ done: false, text: value });
  };
  return (
    <Row>
      <input type="text" ref={inputRef} />
      <button onClick={handleAddToDo}>Add</button>
    </Row>
  );
};

const ToDosContainer = () => {
  const { toDos, sortToDos } = useContext(ToDosContext);

  return (
    <MainContainer>
      {toDos.map((el) => (
        <Row>
          <Checkbox
            checked={el.done}
            onClick={() => sortToDos({ text: el.text, done: !el.done })}
          />
          <p>{el.text}</p>
        </Row>
      ))}
    </MainContainer>
  );
};

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const handleSignIn = () => {
    setUser({
      name: "Test User",
      email: "user@test.com",
    } as User);
  };
  const handleSignOut = () => {
    setUser({} as User);
  };
  return (
    <MainContainer>
      <h2>SignIn</h2>
      <button onClick={handleSignIn}>Sign in</button>
      <button
        onClick={handleSignOut}
        style={{
          backgroundColor: "tomato",
        }}
      >
        Sign out
      </button>
    </MainContainer>
  );
};

const UserPage = () => {
  const { user } = useContext(UserContext);
  return (
    <MainContainer>
      <h3>User Page</h3>
      <h4>Name: {user?.name}</h4>
      <h4>Email: {user?.email}</h4>
    </MainContainer>
  );
};

export default Playground;
