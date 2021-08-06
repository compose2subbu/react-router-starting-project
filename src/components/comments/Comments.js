import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import CommentsList from './CommentsList'
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  //console.log(params)
  //console.log(params.quoteId)
  //console.log('here')
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);
  const {quoteId} = params;
  
  //console.log(quoteId)  
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;

  if(status ==='pending'){
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if(status === 'completed' && loadedComments.length > 0){
    comments = (
      <CommentsList comments={loadedComments} />
    );
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length < 1)){
    comments = (
      <p className='centered'>No Comments Added yet!</p>
    );
  }

 
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
