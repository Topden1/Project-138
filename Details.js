import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url: `http://locslhost:5000/planet7name=${this.props.navigation.getParam(
                "planet_name"
            )}`
         };
    }

    componentDidMount() {
        this.getDetails();
    }
    getDetails = () => {
        const { url } = this.state;
        axios
        .get(url)
        .then(response => {
            this.setDetails(response.data.data);
        })
        .catch(error => {
            Alert.alert(error.message);
        });
    };

    setDetails = planetDetails => {
        const planetType = planetDetails.planet_type;
        let imagePath = "";
        switch (planetType) {
            case "Gas Giant":
                imagePath = require("../assets/planet_type/gas_giant.png");
                break;
            case "Terrestrial":
                imagePath = require("../assets/planet_type/terrestrial.png");
                break;
            case "Super Earth":
                imagePath = require("../assets/planet_type/super_earth.png");
                break;
            case "Neptune Like":
                imagePath = require("../assets/planet_type/neptune_like.png");
                break;
            default:
                imagePath = require("../assets/planet_type/gas_giant.png");
        }

        this.setState({
            details: planetDetails,
            imagePath: imagePath
        });
    };

    render() {
        const { details, imagePath } = this.state;
        if (details.specifications) {
            return (
                <View style={StyleSheet.container}>
                    <Card
                    title={details.name}
                    image={imagePath}
                    imageProps={{ resizeMode: "contain", width: "100%" }}

                >
                    <View
                        style={styles.cardItem}
                        <Text>{details.specifications ? `Specifications : ` : ""}</Text> 
                    >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                    


                </Card>
                </View>
            )
        }
    }
}