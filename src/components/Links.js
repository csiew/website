import { Button, Card, CardBody, CardTitle } from 'brioche';
import links from '../assets/data/links.json';

function Links(props) {
  return (
    <Card className={`${props.className ? props.className : ''}`}>
      <CardTitle>
        <h3>Elsewhere</h3>
      </CardTitle>
      <CardBody className="grid grid-col-3 grid-gap-s">
        {
          links["links"].map((link, index) => {
            return (
              <Button key={index} label={link["name"]} href={link["url"]} openInNewTab />
            );
          })
        }
      </CardBody>
    </Card>
  );
}

export default Links;
