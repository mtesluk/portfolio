import React, { useState } from "react";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, LinearProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
  const [isLoading, setLoading] = useState<boolean>(false);
  // const classes = useStyles();
  const getUser = (id: number) => {
    // axios.get(config.endpoint.blog.user + id).then(response => {
    //   console.log(1)
    // }).catch(error => {
    //   console.log(1)
    // })
    return {id: 1, username: 'mati', blogs: []}
  }


  const getUsers = () => {
    // axios.get(config.endpoint.blog.users).then(response => {
    //   console.log(1)
    //   setLoading(false)
    // }).catch(error => {
    //   console.log(1)
    // })
    return [{id: 1, username: 'mati'}, {id: 2, username: 'kuba'}]
  }

  const onExpand = (e: any, id: number) => {
    setLoading(true)
    const blogs: string[] = getUser(id).blogs;
    setBlogs(blogs);
  }

  const getExpansion = (user: User) => {
    return (
      <div key={user.id}>
        {blogs.length === 0 && isLoading ? <LinearProgress color="secondary" /> : <span></span>}
        <ExpansionPanel onChange={(e) => onExpand(e, user.id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="1"
          >
            {user.username}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <LinearProgress color="secondary" />
            {blogs.map((name: string, id: number) => <div key={id}>{name}</div>)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }

  return (
    <div className="list">
      {getUsers().map((user: User) => getExpansion(user))}
    </div>
  );
};