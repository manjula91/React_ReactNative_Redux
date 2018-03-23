import React from 'react'
import { connect } from 'react-redux'

const Repo = props => (
  <div className='repo-row'>
    <div className='repo-cell'>
      <a className='name' href={props.url}>
        {props.id}
      </a>
    </div>
    <div className='stars repo-cell'>
      {props.name}
    </div>
    <div className='stars repo-cell'>
      {props.username}
    </div>
    <div className='stars repo-cell'>
      {props.stars}
    </div>
    <div className='stars repo-cell'>
      {props.stars}
    </div>
    <div className='clear' />
  </div>
)

const Repositories = ({ repoDetail }) => (
  <div className='section repositories repo-table'>
    <RepoHeader />
    {console.log(repoDetail)}
    {repoDetail.repos &&
            repoDetail.repos.map((repo, index) => (
              <Repo key={index} name={repo.name} url={repo.url} stars={repo.stars} />
            ))}
  </div>
)

const RepoHeader = props => (
  <div className='repo-row'>
    <div className='repo-cell'>
            ID
        </div>

    <div className='repo-cell'>
            Repo Title
        </div>

    <div className='repo-cell'>
            Owner
        </div>

    <div className='repo-cell'>
            Stars
        </div>
    <div className='repo-cell'>
            Created At
        </div>

  </div>
)

function mapStateToProps (state) {
  console.log(state.home.repoDetails)
  return {
    repoDetail: state.home.repoDetails || {}
  }
}

export default connect(mapStateToProps)(Repositories)
