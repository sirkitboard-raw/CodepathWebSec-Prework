define([
    "react",
    "react-dom"
], function(React, ReactDOM) {
    console.log(React);
    var something = React.createClass({
        getInitialState: function() {
            return {
                showCustom: false,
                inputPercent: 0.15,
                results: null
            }
        },
        setTipPercent: function(e) {
            if(e.target.getAttribute('value')) {
                this.setState({
                    inputPercent: parseFloat(e.target.getAttribute('value')),
                    showCustom: false
                })
            } else {
                this.setState({
                    showCustom: true
                })
            } 
            // debugger;
        },
        setCustomTipPercent: function(e) {
            var value = parseFloat(e.target.value);
            if(value >= 0) {
                this.setState({
                    inputPercent: value/100
                });
            }
        },
        updateValues: function() {
            // debugger;
            var self = this;
            var value = parseInt(ReactDOM.findDOMNode(this.refs.inputSubtotal).value);
            var split = parseInt(ReactDOM.findDOMNode(this.refs.inputSplit).value);
            if(value < 0 || split < 1) {
                return;
            }
            $.ajax({
                url: "/api/tip",
                method:"POST",
                data: {
                    value: value,
                    numPeople: split,
                    inputPercent: this.state.inputPercent
                },
                success: function(r) {
                    self.setState({
                        results: r
                    })
                },
                error: function(e) {
                    console.log(e)
                }
            })
        },
        render: function() {
            var results = null;
            if(this.state.results) {
                results = (
                    <div className="container z-depth-5" style={{marginTop: '20px', display: this.state.results ? "block" : "none"}}>
                        Tip: {this.state.results.tip} <br/>
                        Total: {this.state.results.total} <br/>
                        Cost Per Person: {this.state.results.split.toFixed(2)}
                    </div>
                )
            }
            return (
                <div>
                    <div className="z-depth-5 container">
                        <div className="row">
                            <h2>Tip Calcualtor</h2>
                        </div>
                        <div className="row subtotal-row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">attach_money</i>
                                <input ref="inputSubtotal" placeholder="0" id="input-subtotal" min="0" className="validate" type="number"/>
                                <label htmlFor="input-subtotal">Subtotal</label>
                            </div>
                        </div>
                        Tip Percentage:
                        <div className="row percent-row">
                            <form>
                                <div className="col s3">
                                    <input onClick={this.setTipPercent} value="0.1" name="tip-percent" type="radio" id="percent10" defaultChecked={true}/>
                                    <label htmlFor="percent15">10%</label>
                                </div>
                                <div className="col s3">
                                    <input onClick={this.setTipPercent} value="0.15" name="tip-percent" type="radio" id="percent15"/>
                                    <label htmlFor="percent15">15%</label>
                                </div>
                                <div className="col s3">
                                    <input onClick={this.setTipPercent} value="0.2" name="tip-percent" type="radio" id="percent20"/>
                                    <label htmlFor="percent20">20%</label>
                                </div>
                                <div className="col s3">
                                    <input onClick={this.setTipPercent} name="tip-percent" type="radio" id="percentCustom"/>
                                    <label htmlFor="percentCustom">Custom</label>
                                </div>
                            </form>
                        </div>
                        <div className="row" style={{display: this.state.showCustom ? "block" : "none"}}>
                            <div className="input-field col s12">
                                <input ref="inputCustomTip" onChange={this.setCustomTipPercent} placeholder="15" id="input-custom-tip" min="0" className="validate" type="number"/>
                                <label htmlFor="input-custom-tip">Custom Tip %</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input ref="inputSplit" placeholder="1" id="input-split" min="1" className="validate" type="number"/>
                                <label htmlFor="input-split">Split Between: </label>
                            </div>
                        </div>
                        <div className="row">
                            <a onClick={this.updateValues} className="offset-s2 col s8 waves-effect waves-light btn">Submit
                                <i className="material-icons right">send</i>
                            </a>
                        </div>
                    </div>
                    {results}
                </div>
            );
        }
    });
    return something;
});