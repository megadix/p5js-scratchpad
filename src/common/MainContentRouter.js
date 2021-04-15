import {Route, Switch} from 'react-router-dom';
import {routes} from "../config/routes";

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
    </Switch>
  );
}