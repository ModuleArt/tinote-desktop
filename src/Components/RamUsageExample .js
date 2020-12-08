import React, { Component } from "react";
class RamUsageExample extends Component {
  state = {
    aMemVal: "",
    tMemVal: "",
    isbtnRamUsage: 0,
  };

  styles = {
    btnRamUsage: {
      color: " #fff",
      backgroundColor: "#28a745",
      borderColor: "#28a745",
      borderRadius: "0.25rem",
      fontWeight: 400,
      textAlign: "center",
      border: "1px solid transparent",
      padding: ".375rem .75rem",
      fontSize: " 1rem",
      lineHeight: "1.5",
      cursor: "pointer",
    },
    spanStyles: {
      margin: 10,
    },
  };

  render() {
    return (
      <div>
        {this.GetMemBtn()}
        {this.state.isbtnRamUsage === 1 ? (
          <p id="ram">
            Available Memory :
            <span id="aMem" style={this.styles.spanStyles}>
              {this.state.aMemVal}
            </span>
            Total Memory :
            <span id="tMem" style={this.state.spanStyles}>
              {this.state.tMemVal}
            </span>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }

  GetMemBtn() {
    return (
      <input
        type="button"
        style={this.styles.btnRamUsage}
        value="Get Ram Usage"
        onClick={() => {
          this.ramUsage();
          this.isRamBtnClicked();
        }}
      />
    );
  }

  ramUsage() {
    Neutralino.computer.getRamUsage(
      function (data) {
        let aMem =
          (data["ram"]["available"] / (1024 * 1024)).toFixed(3) + " GB";
        this.setState({ aMemVal: aMem });

        let tMem = (data["ram"]["total"] / (1024 * 1024)).toFixed(3) + " GB";
        this.setState({ tMemVal: tMem });
      }.bind(this),
      function () {
        this.setState({ aMemVal: "Error While Executing" });
      }.bind(this)
    );
  }

  isRamBtnClicked = () => {
    this.setState({ isbtnRamUsage: 1 });
  };
}

export default RamUsageExample;
