import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import githubApiRepository from "../repositories/GitHubApiRepository";
import { getRelativeTimeSince } from "../utils/Timestamp";
import packageMetadata from "../../package.json";

function Footer() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    return githubApiRepository.getClosedPullRequests()
      .then(result => {
        setLastUpdated(result.data[0].closed_at);
      })
      .catch(e => console.debug(e));
  }, []);

  return (
    <footer className="grid grid-col-1 grid-gap-l">
      <div className="width-max-240 margin-auto-horizontal grid grid-col-1 grid-gap-s font-weight-600">
        <NavLink to="/changelog" className="width-auto">Version {packageMetadata.version}</NavLink>
        <small>Last updated {getRelativeTimeSince(lastUpdated)}</small>
      </div>
      <span>&copy; 2021 Clarence Siew</span>
    </footer>
  )
}

export default Footer;
