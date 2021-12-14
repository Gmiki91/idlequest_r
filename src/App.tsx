import CharPage from "./pages/CharPage";
import * as Realm from "realm-web";
import React from "react";

const REALM_APP_ID = "idlequest-biajk";
const app: Realm.App = new Realm.App({ id: REALM_APP_ID });
const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
export const MongoDbContext = React.createContext(mongodb);
/*
const UserDetail: React.FC<{ user: Realm.User }> = ({ user }) => {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
}

const Login: React.FC<{ setUser: (user: Realm.User) => void }> = ({ setUser }) => {
  const loginAnonymous = async () => {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
}
*/
const App: React.FC = () => {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState<Realm.User | null>(app.currentUser);

  return (
    <MongoDbContext.Provider value={mongodb}>
    <div className="App">
      <div className="App-header">
        <CharPage/>
      </div>
    </div>
    </MongoDbContext.Provider>
  );
}

export default App;
