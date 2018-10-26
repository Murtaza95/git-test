import React,{Component} from 'react';
import{Text,FlatList,View} from 'react-native';
import{Card}from 'react-native-elements';
import {LEADERS}from '../shared/leaders';
import{ListItem}from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


const renderLeader=({item,index})=>{
    return(
        
<ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{source: require('./images/alberto.png')}}
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
    constructor(props)
    {
       
        super(props);
        this.state={
            //dishes:DISHES,
           // promotions:PROMOTIONS,
            leaders:LEADERS,
            
        }
    }
    static navigationOptions={
        
        title: 'About Us'
        
    };

render(){
   
    return(
        <ScrollView>
            <History/>
            <Card title="Carporate Leadership">
        <FlatList
            data={this.state.leaders}
            renderItem={renderLeader}
            keyExtractor={item => item.id.toString()}
            
            />
            </Card>
        </ScrollView>
       

    
            );
        

}

}
export default About;