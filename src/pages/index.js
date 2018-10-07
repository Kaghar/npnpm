import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import { graphql } from "gatsby"




class IndexPage extends React.Component {
  
  render() {
    const TabNames = get(this.props, 'data.allContentfulTabNames.edges');
    const Home = get(this.props, 'data.allContentfulTabNames.edges[1].node.firstTabTitle');
    const BlogTitle = get(this.props, 'data.allContentfulBlogMainTitle.edges[0].node.title');
    const BlogBox = get(this.props, 'data.allContentfulBlogBox.edges');
    const ReleasesTitle = get(this.props, 'data.allContentfulRelasesTitle.edges[0].node.title');
    const AddonBox = get(this.props, 'data.allContentfulAddonBox.edges');
    
    return (
      <Layout>
        <div className="navigationBox">
          <Link className="navigationBox__item heading-1 navigationBox__item-active" to="/">{Home}</Link>
          {TabNames.filter(function(element){
            if(element.node.firstTabTitle === Home) {
              return false;
            }
            return true;
            }).map(element => {
              return (
                <Link key={element.node.firstTabTitle} className="navigationBox__item heading-1" to={element.node.firstTabTitle.toLowerCase()}>{element.node.firstTabTitle}</Link>
              )
            })}
        </div>
        <div className="contentBox">
          <div className="productsBox">
            <h1 className="heading-1 productsBox__title">{ReleasesTitle}</h1>
            <div className="productsBox__small">
              {AddonBox.map(element => {
                return(
                  <div key={element.node.titleOfAddon} className="productsBox__card">
                    <img src={`https:`+element.node.screenshotOfAddon.file.url} alt="screenshot of a addon" className="productsBox__card-img"/>
                    <h3 className="heading-3">{element.node.titleOfAddon}</h3>
                    <div className="productsBox__card-smallbox">
                      <div>
                        {element.node.reviewStars.map(e => {
                          let key = Math.random();
                          return(
                            <img key={key} src={`https:`+e.file.url} alt="star" className="productsBox__card-smallbox--img"/>
                          )
                        })}
                        <div className="productsBox__card-smallbox--bgstar">
                          <img src={`https:`+element.node.reviewStarBackground.file.url} alt="star" className="productsBox__card-smallbox--bgstar--img"/>
                          <img src={`https:`+element.node.reviewStarBackground.file.url} alt="star" className="productsBox__card-smallbox--bgstar--img"/>
                          <img src={`https:`+element.node.reviewStarBackground.file.url} alt="star" className="productsBox__card-smallbox--bgstar--img"/>
                          <img src={`https:`+element.node.reviewStarBackground.file.url} alt="star" className="productsBox__card-smallbox--bgstar--img"/>
                      </div>
                      </div>
                      <div className="productsBox__card-smallbox--review">{element.node.reviewButtonText}</div>
                    </div>
                    <div className="productsBox__card-smallbox">
                      <button className="btn btn__Blue">{element.node.tryItButtonText}</button>
                      <button className="btn btn__Grey">{element.node.screenshotButtonText}</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="blogBox">
            <h1 className="heading-1">{BlogTitle}</h1>
            {BlogBox.map(element => {
              return (
                <div key={element.node.titleOfABlog} className="blogBox__card" style={{backgroundImage: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)) ,url(https:`+element.node.backgroundPicture.file.url+`)`}}>
                  <div className="blogBox__card-smallbox">
                    <h2 className="heading-2 blogBox__card-smallbox--title">{element.node.titleOfABlog}</h2>
                    <button className="btn btn__Grey blogBox__card-smallbox--btn">{element.node.readMoreButtonText}</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
query {
  allContentfulTabNames {
    edges {
      node {
        firstTabTitle
      }
    }
  }
  allContentfulBlogMainTitle {
    edges {
      node {
        title
      }
    }
  }
  allContentfulBlogBox{
    edges {
      node {
        backgroundPicture {
          file{
            url
          }
        }
        titleOfABlog
        readMoreButtonText
      }
    }
  }
  allContentfulRelasesTitle {
    edges{
      node{
        title
      }
    }
  }
  allContentfulAddonBox{
    edges{
      node{
        screenshotOfAddon{
          file{
            url
          }
        }
        screenshotButtonText
        titleOfAddon
        tryItButtonText
        reviewStars{
          file{
            url
          }
        }
        reviewButtonText
        reviewStarBackground{
          file{
            url
          }
        }
      }
    }
  }
}
`
