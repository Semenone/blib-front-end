import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import { withBlibService } from "../hoc";
import { fetchFrige, removeProductFromFrigeDispatch } from "../../actions";
import { connect } from "react-redux";
import { compose } from "redux";

import "./refrigerator-panel.css";

class RefrigeratorPanel extends Component {
  state = {
    componentShouldUpdate: false
  };

  componentDidMount() {
    const { fetchFrige, libId } = this.props;
    fetchFrige(libId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchFrige, libId } = this.props;

    if (this.state.componentShouldUpdate) {
      this.setState({ componentShouldUpdate: false });
      let timerId = setInterval(() => fetchFrige(libId), 1000);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1100);
    }
  }

  render() {
    const { frige, removeProductFromFrigeDispatch } = this.props;
    return (
      <div className="root" style={{ marginBottom: "400px" }}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className="column">
              <Typography className="heading">My frige</Typography>
            </div>
            <div className="column">
              <Typography className="secondaryHeading">
                Select trip destination
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="details">
            <div className="column" />
            <div className="column">
              {frige.map(e => {
                console.log(e);
                return (
                  <>
                    <Chip
                      label={e.title}
                      onDelete={() => {
                        removeProductFromFrigeDispatch(e.productid);
                        this.setState({ componentShouldUpdate: true });
                      }}
                      style={{ marginBottom: "5px" }}
                    />
                    <br />
                  </>
                );
              })}
            </div>
            <div className="helper column">
              <Typography variant="caption">
                Select your destination of choice
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = ({ frige, loading, libId, error }) => ({
  frige,
  loading,
  libId,
  error
});

export default compose(
  withBlibService(),
  connect(mapStateToProps, { fetchFrige, removeProductFromFrigeDispatch })
)(RefrigeratorPanel);
