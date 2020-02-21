import React from 'react'
import {Text, View, Image, Dimensions, Animated, PanResponder, StyleSheet, TouchableNativeFeedback, Button} from 'react-native'
import ReactPropTypes from 'react'
import Fieldset from 'react'


export default class NamesCarousel extends React.Component{

    static propTypes = {
        names: ReactPropTypes.array,
        lastnames: ReactPropTypes.array,
        pics: ReactPropTypes.array,
        formations: ReactPropTypes.array
    }

    constructor (props) {
        super(props)
        let {width} = Dimensions.get('window')
        
        this.state = {
          width: width,
          page: 0,
          translate: new Animated.Value(0)
        }
      }

      componentWillMount() {
          this.panResponder = PanResponder.create({
             onStartShouldSetPanResponder: (evt, gestureState) => false, 
             onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
             onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState) > 7,
             onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
             onPanResponderTerminationRequest: (evt, gestureState)=> false,
             onPanResponderMove: Animated.event([null, {dx: this.state.translate}]),
             onPanResponderRelease: this.endGesture.bind(this),
             onPanResponderTerminate: (evt, gestureState) =>{ console.log('')},
             onShouldBlockNativeResponder:(evt, gestureState) => true
          })
      }

      endGesture(evt, gestureState){
          let toValue = 0
        if(Math.abs(gestureState.dx) / this.state.width> 0.2){
            if(gestureState.dx < 0){
                toValue = this.state.width * -1
            }
            else {
                toValue = this.state.width
            }
            Animated.timing(
                this.state.translate,
                {
                   toValue: toValue ,
                   duration: 300,
                   useNativeDriver: true
               }
            ).start(() => {
                this.state.translate.setValue(0)
                if(toValue < 0){
                    this.nextPage()
                }
                else if (toValue > 0) {
                    this.previousPage()
                }
            })
        }    
    }

    nextPage() {
        let page= this.state.page + 1
        if(page>=this.props.names.length){
            page = 0
        }
         this.setState({page})
    }
    previousPage() {
        let page= this.state.page - 1
        if (page < 0){
            page = this.props.names.length -1
        }
        this.setState({page})
   }

   _onPressCoursButton() {
        alert('Cours pris.')
  }
  _onPressFavButton() {
     alert("Teach'r retiré de favoris.")   
}

      getStyle () {
          return{
              slider: {
                flexDirection: 'row',
                height: 500,
                width: (this.props.names.length+2) * this.state.width,
                left: (this.state.page+1) * -1 * this.state.width,
                transform: [{
                   translateX: this.state.translate
                }] 
              },
              image: {
                  left: 10,
                  top: 40,
                  width: 70,
                  height: 60,
                  position: 'absolute'
                  //justifyContent: 'space-between'
              },
              nameText: {
                //justifyContent: 'space-between',
                fontSize: 30,
                position: 'absolute',
                left: 90,
                top: 40
              },
              titleFormationText: {
                //justifyContent: 'space-between',
                fontSize: 25,
                top: 105,
                left: 10,
                position: 'relative',
                color: '#AAAAAA'
              },
              formationText: {
                //justifyContent: 'space-between',
                fontSize: 20,
                top: 105,
                left: 10,
                position: 'relative',
              },

              titleDescriptionText: {
                fontSize: 25,
                top: 105,
                left: 10,
                position: 'relative',
                color: '#AAAAAA'
              },
              descriptionText: {
                //justifyContent: 'space-between',
                fontSize: 20,
                top: 105,
                left: 5,
                marginBottom:'auto',
                position: 'relative',
                marginLeft: 'auto',
                marginRight: 'auto',
                
                
              },

              buttonPrendreCoursContainer:{
                top:200,
                left: 5,
                width:this.state.width-20,
                height: 40,
                position: 'relative'
              },
          
              buttonFavorisContainer:{
                top:220,
                left: 5,
                width:this.state.width-20,
                height: 40,
                position: 'relative',
                backgroundColor: 'orange'
                },

                textButtonFavoris:{
                    color:'orange',
                    backgroundColor:'white',
                    textAlign:'center',
                    width:this.state.width-22,
                    top:1,
                    left:1,
                    fontSize: 20,
                    height: 38
                },
                textButtonPrendreCours:{
                    color:'white',
                    backgroundColor:'steelblue',
                    textAlign:'center',
                    width:this.state.width-22,
                    top:1,
                    left:1,
                    fontSize: 20,
                    height: 38
                }
            }

      }

    render(){
        let indexMax=this.props.names.length-1
        const style = this.getStyle()
        return(
            
            <Animated.View {...this.panResponder.panHandlers} style={style.slider}>
                <View style={{width: this.state.width}}>

                    <Image source={{uri: this.props.pics[indexMax]}} style={style.image} />
                    <Text style={style.nameText}>
                       {this.props.names[indexMax]} {this.props.lastnames[indexMax]}
                    </Text>

                    <View >
                        <Text style={style.titleFormationText}>Formation</Text>
                        <Text style={style.formationText}>{this.props.formations[indexMax]} </Text>
                        <Text style={style.titleDescriptionText}>Descritption</Text>
                        <Text style={style.descriptionText}>Calme et patient, je sais m'adapter à l'élève et comprendre sa méthode d'apprentissage afin de l'aider à progresser au mieux</Text>
                    </View>

                    <View style={style.buttonPrendreCoursContainer}>
                        <TouchableNativeFeedback>
                            <Text onPress={this._onPressCoursButton} style={style.textButtonPrendreCours}>Prendre un cours avec ce teach'r</Text>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={style.buttonFavorisContainer}>
                                <TouchableNativeFeedback onPress={this._onPressFavButton} >
                                    <Text style={style.textButtonFavoris}>Retirer ce teach'r de mes favoris</Text>
                                </TouchableNativeFeedback>
                    </View>

                </View>
                {this.props.pics.map((pic, k) =>{
                    return (
                        <View style={{width: this.state.width}}>

                            <Image source={{uri: this.props.pics[indexMax]}} style={style.image} />
                            <Text style={style.nameText}>
                                {this.props.names[k]} {this.props.lastnames[k]}
                            </Text>

                            <View >
                                <Text style={style.titleFormationText}>Formation</Text>
                                <Text style={style.formationText}> {this.props.formations[k]} </Text>
                                <Text style={style.titleDescriptionText}>Descritption</Text>
                                <Text style={style.descriptionText}>Calme et patient, je sais m'adapter à l'élève et comprendre sa méthode d'apprentissage afin de l'aider à progresser au mieux</Text>
                            </View>

                            <View style={style.buttonPrendreCoursContainer}>
                                <TouchableNativeFeedback>
                                    <Text onPress={this._onPressCoursButton} style={style.textButtonPrendreCours}>Prendre un cours avec ce teach'r</Text>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={style.buttonFavorisContainer}>
                                
                                <TouchableNativeFeedback onPress={this._onPressFavButton} >
                                    <Text style={style.textButtonFavoris}>Retirer ce teach'r de mes favoris</Text>
                                </TouchableNativeFeedback>
                                
                            </View>
 
                        </View>
                    )
                })}
                
                <View style={{width: this.state.width}}>

                    <Image source={{uri: this.props.pics[0]}} style={style.image} />
                    <Text style={style.nameText}>    
                        {this.props.names[0]} {this.props.lastnames[0]}
                    </Text>

                    <View >
                        <Text style={style.titleFormationText}>Formation</Text>
                        <Text style={style.formationText}>{this.props.formations[0]} </Text>
                        <Text style={style.titleDescriptionText}>Descritption</Text>
                        <Text style={style.descriptionText}>Calme et patient, je sais m'adapter à l'élève et comprendre sa méthode d'apprentissage afin de l'aider à progresser au mieux</Text>
                    </View>

                    <View style={style.buttonPrendreCoursContainer}>
                        <TouchableNativeFeedback>
                            <Text onPress={this._onPressCoursButton} style={style.textButtonPrendreCours}>Prendre un cours avec ce teach'r</Text>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={style.buttonFavorisContainer}>
                               <TouchableNativeFeedback onPress={this._onPressFavButton} >
                                    <Text style={style.textButtonFavoris}>Retirer ce teach'r de mes favoris</Text>
                                </TouchableNativeFeedback>
                    </View>

               </View>
                
            </Animated.View>
        )
    }
}