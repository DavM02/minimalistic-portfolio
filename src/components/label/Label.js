import { Row } from "../containers/containers"
import  Container from "../containers/containers"
function Label() {

    return <div className="label">
        <Container>
            <Row>
              
                    <div className="propject-creation-date">
                      
                        <span>{`[24.12.2023]`}</span>
                    </div>
         
                <div className="author">
                    <span>{`[DavM02]`}</span>
                </div>
            </Row>
        </Container>
    </div>
}

export default Label