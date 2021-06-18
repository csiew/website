import { Card, CardBody, CardTitle } from './Card.js';
import links from '../assets/data/links.json';

function Links(props) {
  return (
    <Card className={`${props.className ? props.className : ''}`}>
      <CardTitle>
        <h3>Elsewhere</h3>
      </CardTitle>
      <CardBody className="grid grid-col-3 grid-col-responsive grid-gap-s">
        {
          links["links"].map(link => {
            return (
              <a href={link["url"]} target="_blank" className="button" rel="noreferrer" key={link["id"]}>{link["name"]}</a>
            );
          })
        }
      </CardBody>
    </Card>
  );
}

export default Links;
