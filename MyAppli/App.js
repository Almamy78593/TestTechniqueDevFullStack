/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import NamesCarousel from './Components/NamesCarousel'





export default class App extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            pics: [
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
                ],

            names: [
                
                'Pierre',
                'Michel',
                'Jam',
                'Jean',
                'Michel',
                'Jeanne',
                'Max',
                'Michel',
                'Jacq',
                'Ja'

            ],

            lastnames: [
                'Martial',
                'Mor',
                'Volmer',
                'Sandler',
                'Moria',
                'Ouinas',
                'Martin',
                'Moulin',
                'Ounas',
                'Morant'
            ],
            formations: [
                'Université de Cergy-Pontoise',
                'UPMC',
                'ESILV',
                'Université Paris-Nanterre',
                'Université de Cergy-Pontoise',
                'UPCM',
                'ESSEC',
                'Université Paris-Nanterre',
                'UPMC',
                'Université de Cergy-Pontoise'
            ]
        }
    }
    _onPressButton() {
      alert('Pas de page precedente.')
    }
    render(){
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'steelblue'}}>
          <View style={styles.buttonContainer}>
            <Button
              color= 'steelblue'
              id= 'previousButton'
              onPress={this._onPressButton}
              title="Prev"
            />
          </View>
          <Text style={{fontSize: 40, color: 'white', left:10, top:100 }}>Teach'rs favoris</Text>
        </View> 
       
        <View style={{flex: 3, backgroundColor: 'white'}}>
           <ScrollView style={styles.container} >
            <NamesCarousel names={this.state.names} pics={this.state.pics} lastnames={this.state.lastnames} formations={this.state.formations} />
            
          </ScrollView>

      
        </View>
      </View>
     
  );
};


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer:{
      top: 20,
      left: 5,
      width: 60,
      height: 40
    }
})

