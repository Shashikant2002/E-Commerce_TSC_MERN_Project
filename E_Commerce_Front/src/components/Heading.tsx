import React from "react";
import { Link } from "react-router-dom";

const Heading = ({ title, view_all }: { title: string; view_all?: string }) => {
  return (
    <div className="mainHeading flex alignCenter justifyContentBetween">
      <div className="heading">
        <h2>{title}</h2>
      </div>

      {view_all ? (
        <Link to={view_all}>
          <h5 className="view_all">View All</h5>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Heading;
