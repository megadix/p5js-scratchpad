import {Breadcrumb} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import React from "react";
import {getPathComponents} from "../config/routes";

function MyBreadcrumb(props) {
  const breadcrumb = getPathComponents(props.location.pathname);

  if (breadcrumb === null) {
    return '';
  }

  return (
    <Breadcrumb>
      {
        breadcrumb.map((crumb, i) => {
          if (crumb === null) {
            return null;
          }
          if (i === breadcrumb.length - 1) {
            return (
              <Breadcrumb.Item key={crumb.path}
                               active>
                {crumb.label}
              </Breadcrumb.Item>
            );
          }
          else {
            return (
              <Breadcrumb.Item key={crumb.path}
                               linkAs={Link}
                               linkProps={{to: crumb.path}}>
                {crumb.label}
              </Breadcrumb.Item>
            );
          }
        })
      }
    </Breadcrumb>
  );
}

const MyBreadcrumbWithRouter = withRouter(MyBreadcrumb);

export default MyBreadcrumbWithRouter;