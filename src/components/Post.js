import React from "react";
import { Grid, Image, Text, Button, HeartButton } from "../elements/Index";
import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post_module";

const Post = React.memo((props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <React.Fragment>
                <Button
                  width="auto"
                  padding="5px 10px"
                  margin="10px 3px 10px 10px"
                  _onClick={() => {
                    history.push(`/write/${props.id}`);
                  }}
                >
                  수정
                </Button>
                <Button
                  width="auto"
                  padding="5px 10px"
                  margin="10px 3px"
                  _onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    dispatch(postActions.deletePostFB(props.id));
                  }}
                >
                  삭제
                </Button>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text margin="0px 10px 0px 3px" font-size="24px" bold>
            댓글 {props.comment_cnt}개 
          </Text>

          <Text margin="0px" bold>
            좋아요 {props.like_cnt}개
          </Text>

          <HeartButton
            _onClick={(e) => {
              //  이벤트 캡쳐링과 버블링을 막아요!
              // 이벤트 캡쳐링, 버블링이 뭔지 검색해보기! :)
              e.preventDefault();
              e.stopPropagation();
              dispatch(postActions.toggleLikeFB(props.id));
            }}
            is_like={props.is_like}
          ></HeartButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Post.defaultProps = {
  user_info: {
    user_id: "",
    user_name: "shane",
    user_profile:
      "https://images.theconversation.com/files/20706/original/dkkvsc9j-1361934641.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
  },
  image_url:
    "https://images.theconversation.com/files/20706/original/dkkvsc9j-1361934641.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
  contents: "우와~ 멋진 바다로 떠나고 싶다.!",
  like_cnt: 10,
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
  is_like: false,
};

export default Post;
