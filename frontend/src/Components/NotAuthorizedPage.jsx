// Kelly Mahoney

import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div>
      <h1>You are not authorized to view this page! ☹️</h1>
      <Link to="">Please Login First</Link>
    </div>
  );
}