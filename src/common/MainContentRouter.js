import {Route, Switch} from 'react-router-dom';
import {routes} from "../config/routes";
import Page404 from "../Page404";

export default function MainContentRouter() {
  return (
    <Switch>
      {Object.entries(routes).map(([path, {exact, label, component, render}]) =>
        <Route path={path} key={path}
               exact={exact}
               component={component}
               render={render}
        />
      )}
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
}