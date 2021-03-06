import React,{Component} from 'react';
import{Text,FlatList,View} from 'react-native';
import{Card}from 'react-native-elements';
import{ListItem}from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';



const mapStateToProps= state =>{
    return{
        leaders: state.leaders 
    }
}

const renderLeader=({item,index})=>{
    return(
        
<ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{source:{uri: baseUrl + item.image} }}
        />
        
        
    );
}
function History()
{
    return(
        <Card title="Our History">   
        <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par
             excellence in Hong Kong. With its unique brand ofworld fusion cuisine that can be found 
             nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of
              the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us{"\n"}.
            </Text>
            <Text>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured
             for the first time the world's best cuisines in a pan.{'\n'}

        </Text>
      
        </Card>

            );
}
class About extends Component{
   
    static navigationOptions={
        
        title: 'About Us'
        
    };

render(){
   if(this.props.leaders.isLoading)
   {
    return(
            <ScrollView>
            <History/>
            <Card title="Carporate Leadership">
            <Loading/>
            </Card>
            </ScrollView>
    );  
   }
   else if(this.props.leaders.errMess)
   {
    return(
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <History/>
        <Card title="Carporate Leadership">
        <Text>{this.props.leaders.errMess}</Text>
        </Card>
        </Animatable.View>
        </ScrollView>
);  
   }
   else{
    return(
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History/>
            <Card title="Carporate Leadership">
        <FlatList
            data={this.props.leaders.leaders}
            renderItem={renderLeader}
            keyExtractor={item => item.id.toString()}
            
            />
            </Card>
            </Animatable.View>
        </ScrollView>
            );
           
   }
    
}

}
export default connect(mapStateToProps) (About);