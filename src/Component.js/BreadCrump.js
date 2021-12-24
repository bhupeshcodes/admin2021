import React from "react";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { withRouter } from "react-router";

const Breadcrumb = (props) => {
  const {
    history,
    location: { pathname },
  } = props;

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      style={{ fontSize: 13, paddingLeft: 10 }}
    >
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}> {name} </Typography>
        ) : (
          <Link key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default withRouter(Breadcrumb);
