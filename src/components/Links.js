import { Card, CardBody, CardTitle, List, ListItem } from 'brioche';
import links from '../assets/data/links.json';

function Links(props) {
  return (
    <Card className={`${props.className ? props.className : ''}`}>
      <CardTitle>
        <h3>Elsewhere</h3>
      </CardTitle>
      <CardBody className="padding-none">
        <List>
          {
            links["links"].map((link, index) => {
              return (
                <ListItem href={link["url"]} key={index} openInNewTab>{link["name"]}</ListItem>
              );
            })
          }
        </List>
      </CardBody>
    </Card>
  );
}

export default Links;
