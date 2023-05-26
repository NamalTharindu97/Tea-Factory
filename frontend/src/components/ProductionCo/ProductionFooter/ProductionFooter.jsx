import React, {Component} from 'react';

export default class ProductionFooter extends Component {


    render() {
        const divStyle = {
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: '#24479f',
            color: 'white',
            textAlign:'center',
            flexShrink:0,
            height: '25px',
            backgroundColor:'green'
    }

        return (
            <div className="footer ">
                <footer style={divStyle}>
                    <center>
                        <p className="footer-p">@ 2023 Copyright:Ambrosia </p>
                    </center>
                </footer>
            </div>
        );
    }
}