import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post_module";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements/Index";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"} padding="20px 0px">
        <InfinityScroll
          callNext={() => {
            console.log("next!");
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (user_info && p.user_info.user_id === user_info?.uid) {
              return (
                <Grid
                  bg="#ffffff"
                  margin="8px 0px"
                  key={p.id}
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post key={p.id} {...p} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  key={p.id}
                  bg="#ffffff"
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post {...p} />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "goplanit",
    user_profile:
      "https://icelandnaturally.com/wp-content/uploads/iceland-peaceful-country.jpg",
  },
  image_url:
    "https://icelandnaturally.com/wp-content/uploads/iceland-peaceful-country.jpg",
  contents: "멋진 사진이네요~!",
  comment_cnt: 10,
  insert_dt: "2021-07-02 10:00:00",
};

export default PostList;
