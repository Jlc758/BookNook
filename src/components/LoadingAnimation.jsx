import { Container } from "@mantine/core";
import "../css/index.css";
import page from "../images/Page.png";

function LoadingAnimation() {
  return (
    <Container className="loadingAnimationContainer">
      <div className="container">
        <div className="square black">
          <div className="square">
            <img src={page} className="page" />
            <div className="square black">
              <div className="square">
                {" "}
                <img src={page} className="page" />
                <div className="square black">
                  <div className="square">
                    {" "}
                    <img src={page} className="page" />
                    <div className="square black">
                      <div className="square">
                        {" "}
                        <img src={page} className="page" />
                        <div className="square black">
                          <div className="square">
                            {" "}
                            <img src={page} className="page" />
                            <div className="square black">
                              <div className="square">
                                {" "}
                                <img src={page} className="page" />
                                <div className="square black">
                                  <div className="square">
                                    {" "}
                                    <img src={page} className="page" />
                                    <div className="square black">
                                      <div className="square">
                                        {" "}
                                        <img src={page} className="page" />
                                        <div className="square black">
                                          <div className="square">
                                            {" "}
                                            <img src={page} className="page" />
                                            <div className="square black">
                                              <div className="square">
                                                {" "}
                                                <img
                                                  src={page}
                                                  className="page"
                                                />
                                                <div className="square black">
                                                  <div className="square">
                                                    {" "}
                                                    <img
                                                      src={page}
                                                      className="page"
                                                    />
                                                    <div className="square black">
                                                      <div className="square">
                                                        {" "}
                                                        <img
                                                          src={page}
                                                          className="page"
                                                        />
                                                        <div className="square black">
                                                          <div className="square">
                                                            {" "}
                                                            <img
                                                              src={page}
                                                              className="page"
                                                            />
                                                            <div className="square black">
                                                              <div className="square">
                                                                {" "}
                                                                <img
                                                                  src={page}
                                                                  className="page"
                                                                />
                                                                <div className="square black"></div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LoadingAnimation;
