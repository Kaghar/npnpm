import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import { graphql } from "gatsby"


class ChangeLog extends React.Component {

  render() {
    const TabNames = get(this.props, 'data.allContentfulTabNames.edges');
    const Home = get(this.props, 'data.allContentfulTabNames.edges[1].node.firstTabTitle');
    const BlogTitle = get(this.props, 'data.allContentfulBlogMainTitle.edges[0].node.title');
    const BlogBox = get(this.props, 'data.allContentfulBlogBox.edges');
    const ChangesLog = get(this.props, 'data.allContentfulChangelogBox.edges');
    const ChangesLogTitle= get(this.props, 'data.allContentfulChangeslogTitle.edges[0].node.title') 
    
    return (
      <Layout>
        <div className="navigationBox">
          <Link className="navigationBox__item heading-1 " to="/">{Home}</Link>
          {TabNames.filter(function(element){
            if(element.node.firstTabTitle === Home) {
              return false;
            }
            return true;
            }).map(element => {
              return (
                <Link key={element.node.firstTabTitle} className="navigationBox__item heading-1 navigationBox__item-active" to={element.node.firstTabTitle.toLowerCase()}>{element.node.firstTabTitle}</Link>
              )
            })}
        </div>
        <div className="contentBox">
          <div className="changelogBox">
            <h1 className="heading-1 changelogBox__title">{ChangesLogTitle}</h1>
            {ChangesLog.map(element => {
              function expand(e) {
                e.preventDefault();
                let nextSibling = e.target.nextSibling
                if (nextSibling.style.display === "block") {
                  nextSibling.style.display ="none"
                } else {
                  nextSibling.style.display = "block"
                }
              }
              return (
                <div key={element.node.titleOfAddon} className="changelogBox__box">
                  <h3 className="changelogBox__box-title heading-3 " onClick={expand}>{element.node.titleOfAddon}</h3>
                  <div className="changelogBox__box-smallbox">
                    <h4 className="changelogBox__box-smallbox--title heading-4">{element.node.changesTitle}</h4>
                    <h5 className="changelogBox__box-smallbox--date heading-5"> {element.node.dateOfChangeReleases}</h5>
                    <p className="changelogBox__box-smallbox--text">{element.node.changesText.changesText}</p>
                  </div>
                </div>
              )
            })}
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


export default ChangeLog


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
  allContentfulRelasesTitle {
    edges{
      node{
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
  allContentfulChangelogBox{
    edges{
      node{
        titleOfAddon
        changesTitle
        changesText {
          changesText
        }
        dateOfChangeReleases
      }
    }
  }
  allContentfulChangeslogTitle{
    edges{
      node{
        title
      }
    }
  }
}
`

