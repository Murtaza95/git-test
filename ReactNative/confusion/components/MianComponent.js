import React,{Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import Reservation from './ReservationComponent';
import {View,Platform,Image,StyleSheet,Text} from 'react-native';
import{createStackNavigator,createDrawerNavigator,DrawerItems,SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';


const mapStateToProps= state =>{
    return{
        dishes: state.dishes,
        promotions: state.promotions,
        comments: state.comments,
        leaders: state.leaders

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })


const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
        navigationOptions:({navigation})=>({
            headerLeft:<Icon name='menu' size={24}
            color='white'
            onPress={()=> navigation.toggleDrawer( )}
            />
        }) },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            
        }
    }
);
const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact },

},
{

    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft:<Icon name='menu' size={24}
            color='white'
            onPress={()=> navigation.toggleDrawer( )}
            />
    })
}
);
const AboutNavigator = createStackNavigator({
    About: { screen: About },

},
{

    navigationOptions:({navigation})=>( {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft:<Icon name='menu' size={24}
            color='white'
            onPress={()=> navigation.toggleDrawer( )}
            />
    })
}
);
const FavoriteNavigator = createStackNavigator({
    Favorites: { screen: Favorites },

},
{

    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft:<Icon name='menu' size={24}
            color='white'
            onPress={()=> navigation.toggleDrawer( )}
            />
    })
}
);
const LoginNavigator = createStackNavigator({
    Login: Login
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
});
const ReservationtNavigator = createStackNavigator({
    Reservation: { screen: Reservation },

},
{

    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft:<Icon name='menu' size={24}
            color='white'
            onPress={()=> navigation.toggleDrawer( )}
            />
    })
}
);
const HomeNavigator=createStackNavigator({
    Home: { screen: Home },

},
{
   
    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft:<Icon name='menu' size={24}
            color='white'
            onPress={()=> navigation.toggleDrawer( )}
            />
    })
}
);
const CustomDrawerContentComponent=(props) =>(
<ScrollView>
    <SafeAreaView style={styles.container}
    forceInset={{top:'always', horizontal:'never'}}>
    <View style={styles.drawerHeader}>
    <View style={{flex:1}}>
    <Image source={require('./images/logo.png')}
    style={styles.drawerImage}/>
    </View>
    <View style={{flex:2}}>
<Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
    </View>
    </View>
    <DrawerItems {...props}/>
    </SafeAreaView>
</ScrollView>
);


const MainNavigator=createDrawerNavigator({
    Login:{
        screen: LoginNavigator,
        navigationOptions:{
            title:'Login',
            drawLable:'Login',
            drawerIcon:({tintColor})=>(
                <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color={tintColor}  
                />
              )
        }
    },

    Home:{
screen: HomeNavigator,
navigationOptions:{
    title:'Home',
    drawerLabel:'Home',
    drawerIcon:({tintColor})=>(
      <Icon
      name='home'
      type='font-awesome'
      size={24}
      color={tintColor}  
      />
    )
}
},
About:{
    screen: AboutNavigator,
    navigationOptions:{
        title:'About Us',
        drawLable:'About Us',
        drawerIcon:({tintColor})=>(
            <Icon
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tintColor}  
            />
          )
    }
},
Menu:{
    screen: MenuNavigator,
    navigationOptions:{
        title:'Menu',
        drawLable:'Menu',
        drawerIcon:({tintColor})=>(
            <Icon
            name='list'
            type='font-awesome'
            size={24}
            color={tintColor}  
            />
          )
    }
},
Contact:{
    screen:ContactNavigator,
    navigationOptions:{
        title:'Contact Us',
        drawerLabel:'Contact Us',
        drawerIcon:({tintColor})=>(
            <Icon
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}  
            />
          )
    }
},
Favorites:{
    screen:FavoriteNavigator,
    navigationOptions:{
        title:'My Favorites',
        drawerLabel:'My Favorites',
        drawerIcon:({tintColor})=>(
            <Icon
            name='heart'
            type='font-awesome'
            size={24}
            color={tintColor}  
            />
          )
    }
},
  
Reservation:{
    screen:ReservationtNavigator,
    navigationOptions:{
        title:'Reserve Table',
        drawerLabel:'Reserver Table',
        drawerIcon:({tintColor})=>(
            <Icon
            name='cutlery'
            type='font-awesome'
            size={24}
            color={tintColor}  
            />
          )
    }
}
  
  
}, {
    initialRouteName:'Home',
    drawerBackgroundColor:'#D1E4C9',
    contentComponent:CustomDrawerContentComponent
});

class Main extends Component{

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
  
    render(){
        return(
            <View style={{flex: 1,paddingTop: Platform.OS==='ios'? 0: Expo.Constants.statusBarHeight}}>
            <MainNavigator/> 
             </View>
        );
    }


}
const styles=StyleSheet.create({
    container:{
       flex:1 
    },
    drawerHeader:{
        backgroundColor:'#512DA8',
        height:140,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row'

    },
    drawerHeaderText:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
       

    },
    drawerImage:{
        margin:10,
        width:80,
        height:60


    }

})
export default connect(mapStateToProps, mapDispatchToProps)(Main);