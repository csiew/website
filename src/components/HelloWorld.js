import { Card, CardTitle, CardBody } from './Card.js';

function HelloWorld(props) {
  return (
    <Card className={`${props.className ? props.className : ''}`}>
      <CardTitle>
        <h3>Hello World</h3>
      </CardTitle>
      <CardBody className="width-full height-full flex-inline flex-flow-column align-start justify-start">
        <p>
          Hi there! I'm Clarence. I'm a software engineer based in Melbourne. I graduated with a Bachelor of Software Engineering from Monash University in 2020.
        </p>
        <p>
          I mostly work on web applications and websites as a full-stack engineer. I also have an interest in mobile app development, Linux, and graphic design.
        </p>
        <p>
          I'm a lover of punk, grunge, alternative, and hard rock music.
        </p>
      </CardBody>
    </Card>
  );
}

export default HelloWorld;
