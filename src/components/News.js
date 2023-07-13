import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;



  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; // My Email Address
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=09ec1a0edaca4d4db284b821788f4db3&page=${this.state.page}&pageSize=${props.pageSize}`;     // Mom's Email Address
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  
  useEffect(() => {
      updateNews();
    //eslint-disable-nextline
  }, []);

//   handlePreviousClick = async ()=>{
//     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aa9517bc6fe742be91fa981a3bbd212b&page=${this.state.page-1}&pageSize=${props.pageSize}`;
//     // this.setState({loading : true});
//     // let data = await fetch(url);
//     // let parsedData = await data.json()
//     // console.log(parsedData);
//     // this.setState({
//     //     page : this.state.page-1,
//     //     articles: parsedData.articles,
//     //     loading : false
//     // })
//     await this.setState({page : this.state.page-1})
//     this.updateNews();
    
//   }
//   handleNextClick = async ()=>{
// //     if(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)){
// //     // alert("News limit has been reached")
// //     }
// //     else{
// //             let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aa9517bc6fe742be91fa981a3bbd212b&page=${this.state.page+1}&pageSize=${props.pageSize}`;
// //             this.setState({loading : true});
// //             let data = await fetch(url);
// //             let parsedData = await data.json()
// //             this.setState({
// //                 page : this.state.page+1,
// //                 articles: parsedData.articles,
// //                 loading : false
// //             })
// // } 
//     await this.setState({page : this.state.page+1})
// this.updateNews();
//   }



const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aa9517bc6fe742be91fa981a3bbd212b&page=${page+1}&pageSize=${props.pageSize}`; // My Email Address
  // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=09ec1a0edaca4d4db284b821788f4db3&page=${this.state.page}&pageSize=${props.pageSize}`;     // Mom's Email Address
  // this.setState({loading : true});
  setPage(page+1);
  let data = await fetch(url); 
  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)

  // this.updateNews();
};  
    return (
      <>
  
        <h1 className='text-center' style={{margin: '35px 0px',marginTop: '85px'}}>NewsMonkey - Top <u>{capitalizeFirstLetter(props.category)}</u> Headlines </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >


          
        <div className="container">
        <div className="row h-100 d-flex align-items-center">
        {articles.map((element)=>{
                 return <div className="col-md-4" key={element.url}>
                 <NewsItem  title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author}
                 date = {element.publishedAt} source={element.source.name} colour={props.rang}/>
                </div>
              })}
        </div>
        </div>
        </InfiniteScroll>

        {/* { <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> } */}
        </>
    )
  
}

News.defaultProps = {
  country : 'in',
  pageSize : 6,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News;
