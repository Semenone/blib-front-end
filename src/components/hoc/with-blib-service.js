import React from "react";
import { BlibServiceConsumer } from "../blib-service-context";

const withBlibService = () => Wrapped => {
  return props => {
    return (
      <BlibServiceConsumer>
        {blibService => {
          return <Wrapped {...props} blibService={blibService} />;
        }}
      </BlibServiceConsumer>
    );
  };
};

export default withBlibService;
