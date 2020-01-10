import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from './firebase';
import ModalContent from './ModalContent';
import Overlay from 'react-native-modal-overlay';

class MenuComponent extends Component {
    // Navigation Option
    static navigationOptions = {
        title: 'Menu',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    //costruttore MenuComponent 
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            modalVisible: false
        };

        this.arrayholder = [];

        this.curretPizza={Nome:"Prosciutto e Funghi"};

        this.arrayIngredienti= [];
    }
    //creazione del Array con chiamata al DB
    componentDidMount() {
        this.getDataMenu();
        this.getDataIngredienti();
    }

    //estrazione dal DB delle Pizze
    getDataMenu = () => {
        this.setState({ loading: true });
        ArrPizze = [];
        firebase.firestore().collection("Pizze")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let data = { Ingredienti: doc.data().Ingredienti, Nome: doc.data().Nome, Prezzo: doc.data().Prezzo };
                    ArrPizze.push(data);
                });
                let items = Object.values(ArrPizze);
                this.arrayholder = items;
                this.curretPizza = items[0];
                console.log(items);
                this.setState({
                    data: items,
                    error: null,
                    loading: false,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error, loading: false });
            });

    }
    //estrazione dal DB degli Ingredienti
    getDataIngredienti = () => {
        this.setState({ loading: true });
        ArrIngredienti = [];
        firebase.firestore().collection("Ingredienti")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let data = { Nome: doc.data().Nome, Prezzo: doc.data().Prezzo };
                    ArrIngredienti.push(data);
                });
                let items = Object.values(ArrIngredienti);
                this.arrayIngredienti = items;
            })
            .catch(error => {
                console.log(error);
                this.setState({ error, loading: false });
            });
            
    }
    //Reder del Separatore
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: '#CED0CE',
                }}
            />
        );
    };
    //Metodo per la Ricerca nel Menu della Pizzeria
    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.Nome.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };
    //Reder della barra di ricerca
    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Ricerca..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
                platform="ios"
            />
        );
    };
    //metodo per apertuta Modal, setta la pizza selezionata come current
    openModalAddPizza = (item) => {this.curretPizza=item;this.setState({modalVisible: true});}
    //metodo per chiusura Modal
    closeModalAddPizza = () => this.setState({ modalVisible: false});
    //Ricrea una Parte del Modal
    renderModalContent() {  return ( <ModalContent item={this.curretPizza} /> )}

    //Render del MenuComponent
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={this.openModalAddPizza.bind(this, item)} activeOpacity={1} >
                            <View style={{justifyContent: 'space-between',flex: 1,flexDirection: 'row',marginBottom:12,marginLeft:20,marginRight:20,paddingTop:11}}>
                                <Text style={{fontSize: 18}}>{item.Nome}</Text>
                                <Text style={{fontSize: 18, color:'#007AFF'}}>{"€"+item.Prezzo.toFixed(2)}</Text>
                            </View>
                            <Text style={{fontSize: 12, color:'rgba(0,0,0,0.53)',marginLeft:20,paddingBottom:16}}>{item.Ingredienti.toString()}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.Nome}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
                <Overlay visible={this.state.modalVisible} onClose={this.closeModalAddPizza}  closeOnTouchOutside childrenWrapperStyle={styles.ModalPizze} 
                    animationType="slideInUp" easing={'ease-in-out'} animationDuration={300} containerStyle={{paddingRight:0,paddingLeft:0}}>
                        {this.renderModalContent()}
                </Overlay>
            </View>
        );
    }
}
//Stile
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var height75= height*75/100;
const styles = StyleSheet.create({
    ModalPizze: {
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: height75,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingTop:0,

    },
  });


export default MenuComponent;