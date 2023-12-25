import { Row } from "../../containers/containers";
import data from '../../../data/data.json'

function CurrentProject(props) {


const adjustedIndex = props.index % 20;

    return <>
        <div id="current-project">
            <Row style={{ gap: '20px', height: '405px', overflowY: 'hidden' }}>
                <div className="current-image">
                    <img  src={props.isValidIndex && props.images[props.index]}></img>
                </div>
                <div className="current-project">
                    <span>project name:</span>
                    <h2>{props.isValidIndex &&  data[adjustedIndex].project_name}</h2>

                    <span>authors: </span>
                    <p>{props.isValidIndex &&  data[adjustedIndex].authors.join(', ')};</p>

                    <span>creation date:</span>
                    <span> {props.isValidIndex &&  data[adjustedIndex].creation_date};</span>

                    <span>references:</span>
                    <p>{props.isValidIndex && data[adjustedIndex].references.join(', ')};</p>

                    <span>about:</span>
                    <p> {props.isValidIndex && data[adjustedIndex].description}</p>

                    <span>color palette:</span>
                    <p>
                        {props.isValidIndex && data[adjustedIndex].color_palette.map((color, index) => (
                            <span key={index}>
                                {color.name}: {color.code},<span>&nbsp;</span> 
                            </span>
                        ))}
                    </p>
                </div>
            </Row>
        </div>
    </>



}

export default CurrentProject