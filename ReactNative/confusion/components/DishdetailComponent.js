import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Modal, Button,Alert,PanResponder,Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (comment) => dispatch(postComment(comment)),
})

function RenderComments(props) {

  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
    <Card title='Comments' >
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  handleViewRef = ref => this.view = ref;
  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx < -200 )
        return true;
        
    else
    {
        return false;
    }
};
const recognizeComment = ({moveX, moveY, dx, dy}) => {
  if (dx > 200) {
      return true
  } else {
      return false
  }
}

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
    },
    onPanResponderGrant: () => {
      this.view.rubberBand(1000)
      .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},

    onPanResponderEnd: (e, gestureState) => {
        console.log("pan responder end", gestureState);
        if (recognizeDrag(gestureState))
            Alert.alert(
                'Add Favorite',
                'Are you sure you wish to add ' + dish.name + ' to favorite?',
                [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                ],
                { cancelable: false }
            );
            if (recognizeComment(gestureState)) {
              props.toggleModal();
          }
          return true;
      }
  
  });

  const dish = props.dish;

  const shareDish = (title, message, url) => {
    Share.share({
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
    },{
        dialogTitle: 'Share ' + title
    })
}
  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
      ref={this.handleViewRef}
      {...panResponder.panHandlers}>
      <Card
        featuredTitle={dish.name}
        image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>
          {dish.description}
        </Text>
        <View
          style={styles.dishActionContainer}
        >
          <Icon
            raised
            reverse
            name={props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name={'pencil'}
            type='font-awesome'
            color='#512DA8'
            onPress={() => props.toggleModal()}
          />
          <Icon
          raised
          reverse
          name='share'
          type='font-awesome'
          color='#51D2A8'
          style={styles.cardItem}
          onPress={()=>shareDish(dish.name,dish.description,baseUrl + dish.image)}
          />
        </View>
      </Card>
      </Animatable.View>
    );
  }
  else {
    return (<View></View>);
  }
}

class Dishdetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: '',
      comment: '',
      rating: 5,
    }
  }

  static navigationOptions = {
    title: 'Dish Details'
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  postComment(dishId) {
    this.props.postComment({
      dishId,
      rating: this.state.rating,
      author: this.state.author,
      comment: this.state.comment,
      date: (new Date()).toISOString(),
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {

    const dishId = this.props.navigation.getParam('dishId', '');

    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          // onPress={() => Alert.alert(
          //  'Alert Title',
          //  'My Alert Msg',
          //  [
           //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
           //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
           //   {text: 'OK', onPress: () => console.log('OK Pressed')},
           // ],
           // { cancelable: false }
         // )}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

        <Modal animationType={"slide"} transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}>
          <View style={styles.modal}>
            <Rating
              showRating
              type="star"
              fractions={0}
              startingValue={5}
              imageSize={40}
              style={styles.rating}
              onFinishRating={(value) => { this.setState({ rating: value }) }}
            />
            <Input
              placeholder='Author'
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              onChangeText={(value) => { this.setState({ author: value }) }}
            />
            <Input
              placeholder='Comment'
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={(value) => { this.setState({ comment: value }) }}
            />
            <View style={styles.button}>
              <Button
                onPress={() => { this.postComment(dishId); this.toggleModal() }}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => { this.toggleModal() }}
                color="#A9A9A9"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  dishActionContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  rating: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);