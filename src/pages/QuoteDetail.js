import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from './../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// const DUMMY_QUOTES = [
//     {id: 'q1', author: 'Raju', text: 'Learning Is fun'},
//     {id: 'q2', author: 'Subbu', text: 'Learning Is Always Fun'}
// ];

const QuoteDetail = () => {
    const params = useParams();
    const { quoteId } = params;
    //console.log(quoteId)
    const match = useRouteMatch();
    //console.log(match)
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    
    //console.log('here')

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId])

    if (status === 'pending'){
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if(error){
        return <p className='centered'>{error}</p>
    }

    if(!loadedQuote.text){
        return <p className='centered'>No Quote Found!</p>
    }

    //const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId)

    // if(!quote){
    //     return <p>No quote found!</p>
    // }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`/quotes/${params.quoteId}`} exact>
            <div className='centered'>
                <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load Comments</Link>
            </div>
            </Route>
            
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;