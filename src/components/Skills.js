import { useState } from 'react';
import { Card, CardTitle, CardBody } from './Card.js';
import skills from '../assets/data/skills.json';

function Skills(props) {
  const [filterTerm, setFilterTerm] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const allSkills = [
    ...skills.programmingLangs,
    ...skills.frameworks.frontend,
    ...skills.frameworks.backend,
    ...skills.infrastructure.database,
    ...skills.infrastructure.cloud,
    ...skills.infrastructure.ci,
    ...skills.infrastructure.operatingSystems,
  ];

  const filterSkills = (e) => {
    e.preventDefault();
    setFilterTerm(e.target.value);
    let results = allSkills.filter(item => item.toLowerCase().includes(filterTerm.toLowerCase()));
    setFilterResults(results.length > 0 ? results : []);
  }

  const keyify = (value) => {
    return value.replace(" ", "").toLowerCase();
  }

  const filterResultsSection = () => {
    let itemCount = filterResults.length;
    if (filterTerm.length > 0) {
      return (
        <div id="searchResults" className="tag-list">
          <h4>Results - {itemCount} item{itemCount === 1 ? '' : 's'}</h4>
          <ul>{ filterResults.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
        </div>
      );
    } else {
      return null;
    }
  }

  const allSkillsList = () => {
    if (filterTerm.length === 0) {
      return (
        <div id="allSkillsList">
          <div className="tag-list">
            <div className="grid grid-col-1 grid-gap-s">
              <h4>Programming Languages</h4>
              <div className="tag-list-sub">
                <ul>{ skills.programmingLangs.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
            </div>
          </div>
          <div className="tag-list">
            <h4>Frameworks</h4>
            <div className="grid grid-col-2 grid-col-responsive grid-gap-s">
              <div className="tag-list-sub">
                <h5>Frontend</h5>
                <ul>{ skills.frameworks.frontend.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
              <div className="tag-list-sub">
                <h5>Backend</h5>
                <ul>{ skills.frameworks.backend.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
            </div>
          </div>
          <div className="tag-list">
            <h4>Infrastructure</h4>
            <div className="grid grid-col-2 grid-col-responsive grid-gap-s">
              <div className="tag-list-sub">
                <h5>Database</h5>
                <ul>{ skills.infrastructure.database.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
              <div className="tag-list-sub">
                <h5>Cloud</h5>
                <ul>{ skills.infrastructure.cloud.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
              <div className="tag-list-sub">
                <h5>Continuous Integration</h5>
                <ul>{ skills.infrastructure.ci.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
              <div className="tag-list-sub">
                <h5>Operating Systems</h5>
                <ul>{ skills.infrastructure.operatingSystems.map(item => <li key={ keyify(item) }>{ item }</li>) }</ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <Card className={`${props.className ? props.className : ''}`}>
      <CardTitle>
        <h3>Skills</h3>
      </CardTitle>
      <CardBody className="grid grid-col-1 grid-gap-m">
        <input type="text" className="width-full" name="filterSkills" placeholder="Filter..." onInput={filterSkills} />
        { filterResultsSection() }
        { allSkillsList() }
      </CardBody>
    </Card>
  )
}

export default Skills;
