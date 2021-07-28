import { Card, CardBody, CardTitle } from 'brioche';
import penang from '../assets/img/Penang.png';
import victoria from '../assets/img/Victoria.png';

function Places(props) {
  return (
    <Card className={`${props.className ? props.className : ''}`}>
      <CardTitle>
        <h3>Places</h3>
      </CardTitle>
      <CardBody>
        <div className="width-full margin-auto-horizontal padding-l grid grid-col-1 grid-gap-xl nodrag noselect">
          <div className="vstack align-center justify-center">
            <img src={penang} alt="Penang" className="invert-auto" style={{ margin: "auto", width: "100%", maxWidth: "200px" }} />
            <span className="text-color-secondary font-scale-xs">Penang, Malaysia</span>
          </div>
          <div className="vstack align-center justify-center">
            <img src={victoria} alt="Victoria" className="invert-auto" style={{ margin: "auto", width: "100%", maxWidth: "300px" }} />
            <span className="text-color-secondary font-scale-xs">Victoria, Australia</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Places;