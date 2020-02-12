import React, { useState } from "react";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, LinearProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { config  } from "../../config";
import axios from "axios";


interface User {
  id: number;
  username: string,
  first_name?: string,
  last_name?: string,
}

interface Props {

}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   }),
// );

export const Users = (props: Props) => {
  const [blogs, setBlogs] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<{is: boolean, index: number}>({is: false, index: -1});

  const getUser = (id: number, index: number) => {
    axios.get(config.endpoints.blog.users + id).then(response => {
      setLoading({is: false, index: index})
    }).catch(error => {
      // setLoading({is: false, index: index})
    })
    return {id: 1, username: 'mati', blogs: []}
  }


  const getUsers = () => {
    axios.get(config.endpoints.blog.users).then(response => {
      // console.log(1)
    }).catch(error => {
      // console.log(1)
    })
    return [{id: 1, username: 'mati'}, {id: 2, username: 'kuba'}]
  }

  const onExpand = (e: any, id: number, index: number) => {
    setLoading({is: true, index: index})
    const blogs: string[] = getUser(id, index).blogs;
    setBlogs(blogs);
  }

  const getExpansion = (user: User, index: number) => {
    return (
      <div key={user.id}>
        {blogs.length === 0 && isLoading.is && isLoading.index === index ? <LinearProgress color="secondary" /> : <span></span>}
        <ExpansionPanel onChange={(e) => onExpand(e, user.id, index)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="1"
          >
            {user.username}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {blogs.map((name: string, id: number) => <div key={id}>{name}</div>)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }

  return (
    <div className="list">
      {getUsers().map((user: User, id: number) => getExpansion(user, id))}
    </div>
  );
};